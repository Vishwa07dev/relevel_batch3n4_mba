const Booking = require("../models/booking.model");
const constants = require("../utils/constants");

<<<<<<< HEAD
exports.getAllBookings = async ( req, res) => {

    let queryObj = {};

    if(req.user.userType != constants.userTypes.admin){
       queryObj.userId = req.user._id;
    }

    const bookings = await Booking.find(queryObj);

    res.status(200).send(bookings);
}


exports.getOneBooking = async (req, res) => {

    try{

        const booking = await Booking.findOne({
            _id: req.params.id
        });

        res.status(200).send(booking);

    }catch(err){
        console.log("Error while getting given one booking record", err.message);

        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

 exports.initiateBooking = async (req, res) => {

    try {


       const bookingObj = {
            userId: req.user._id,
            theatreId: req.body.theatreId,
            movieId: req.body.movieId,
            noOfSeats: req.body.noOfSeats,
            ticketBookedTime : Date.now(),
            totalCost : req.bookedTheatre.ticketPrice * req.body.noOfSeats
            
        }

        const booking = await Booking.create(bookingObj);
        req.user.myBookings.push(booking._id);
        req.user.save();

        req.bookedMovie.bookings.push(booking._id);
        req.bookedMovie.save();

        res.status(201).send(booking);

        return setTimeout( async ()=>{

           if(booking.status !== constants.bookingStatuses.completed){

            booking.status = constants.bookingStatuses.failed;

           }        
           await booking.save();
        
        },20000);


    }catch (err) {
        console.log("Error while initiating the booking", err.message);

        return res.status(500).send({
            message: "Some internal error"
        });
    }

}


 exports.updateTheBookingDetails = async (req, res) => {

    try{
    
        req.bookingInParams.theatreId = req.body.theatreId != undefined ? req.body.theatreId : req.bookingInParams.theatreId;
        req.bookingInParams.movieId = req.body.movieId != undefined ? req.body.movieId : req.bookingInParams.movieId;
        req.bookingInParams.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : req.bookingInParams.noOfSeats;
        req.bookingInParams.status = req.body.status != undefined ? req.body.status : req.bookingInParams.status;
        req.bookingInParams.totalCost = req.body.totalCost != undefined ?  (req.bookedTheatre.ticketPrice * req.body.noOfSeats) : req.bookingInParams.totalCost;
    
        const updatedBookingObject = await req.bookingInParams.save();
    
        return res.status(200).send(updatedBookingObject);

    }catch(err){

        console.log("Error while updating booking details", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}
=======
exports.getAllBookings = async (req, res) => {
  if (req.user.userType == constants.userTypes.admin) {
    try {
      const allBookings = await Booking.find();
      return res.status(200).send(allBookings);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          "An internal server error has occured.... please try again later"
        );
    }
  } else {
    let myBookings = [];
    req.user.bookingIds.forEach(async (element) => {
      try {
        let existingBooking = await Booking.findOne({ _id: element });
        myBookings.push(existingBooking);
      } catch (err) {
        console.log(err);
        return res.status(500).send("internal server error");
      }
    });
    return res.status(200).send(myBookings);
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    //req.bookingInparams is provided from the middleware paramsVerifier
    res.status(200).send(req.bookingInParams);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An internal server error has occured.... please try again later");
  }
};

exports.editBooking = async (req, res) => {
  if (req.user.userType == constants.userTypes.customer) {
    try {
      if (!req.body.noOfSeats) {
        req.bookingInParams.bookingStatus = constants.bookingStatus.cancelled;
      }
      else{
        req.bookingInParams.noOfSeats = req.body.noOfSeats
      }
      await req.bookingInParams.save();
      return res
        .status(200)
        .send(
          "You'll have to pay a cancellation fee of 25rs for each cancelled ticket"
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          "An internal server error has occured.... please try again later"
        );
    }
  }
};

exports.createBooking = async (req, res) => {
  let newBooking = {
    movieId: req.body.movieId,
    theatreId: req.body.theatreId,
    userId:
      req.user.userType == constants.userTypes.admin
        ? req.body.userId
        : req.user.userId,
    totalCost: req.body.totalCost,
    noOfSeats: req.body.noOfSeats,
    timing: req.body.timing,
  };
  try {
    let booking = await Booking.create(newBooking);
    req.theatreInBody.bookings.push(booking.id)
     req.user.bookingIds.push(bookingCheck._id);
     await req.theatreInBody.save()
     await req.user.save()
    res.status(201).send({
      id: bookingCheck._id,
      Movie: req.movieInBody.name,
      Theatre: req.theatreInBody.name,
      price: bookingCheck.price,
      noOfSeats: bookingCheck.noOfSeats,
    });
    setTimeout(async () => {
      let bookingCheck = await Booking.findOne({ _id: booking._id });
      if (bookingCheck.bookingStatus != constants.bookingStatus.completed) {
        return;
      } else {
        req.user.bookingIds.push(bookingCheck._id);
        await req.user.save();
      }
    }, 2000);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An internal server error has occured.... please try again later");
  }
};
>>>>>>> 2aca783dcd34a17b90568715f661efd875c90cf7
