const Booking = require("../models/booking.model");
const constants = require("../utils/constants");

exports.getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).send(allBookings);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An internal server error has occured.... please try again later");
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    //req.booking is provided from the middleware paramsVerifier
    res.status(200).send(req.bookingInParams);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An internal server error has occured.... please try again later");
  }
};

// exports.editBooking = async (req, res) => {
//   if (req.user.userType == constants.userTypes.customer) {
//     try {
//       req.bookingInParams.bookingStatus = constants.bookingStatus.cancelled;
//       await req.bookingInParams.save();
//       return res.status(200).send("You'll have to pay a cancellation fee of 25rs");
//     } catch (err) {
//       console.log(err);
//      return  res
//         .status(500)
//         .send(
//           "An internal server error has occured.... please try again later"
//         );
//     }
//   }
//   else{
//     try{

//     }
//   }
// };

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
    setTimeout(async () => {
      let bookingCheck = await Booking.findOne({ _id: booking._id });
      if (bookingCheck.bookingStatus != constants.bookingStatus.completed) {
        return res.status(400).send("session timed out, please retry");
      } else {
        req.user.bookingIds.push(bookingCheck._id);
        await req.user.save();
        return res.status(201).send({
          message: "Successfully booked",
          ticketDetails: {
            id: bookingCheck._id,
            Movie: req.movieInBody.name,
            Theatre: req.theatreInBody.name,
            price: bookingCheck.price,
            noOfSeats: bookingCheck.noOfSeats,
          },
        });
      }
    }, 2000);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An internal server error has occured.... please try again later");
  }
};
