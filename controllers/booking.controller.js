const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const calculateTheBookingCost = require("../utils/calculateTheBookingCost");

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

        const booking = await Movie.findOne({
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
            showTime: req.body.showTime,
            noOfSeats: req.body.noOfSeats,
            totalCost : calculateTheBookingCost(theatreId.ticketPrice, noOfSeats)
        }

        const booking = await Booking.create(bookingObj);

        setTimeout( async ()=>{
           console.log("SetTimeout is trigged");

           booking.status = constants.bookingStatus.failed;        
           await booking.save();
        
       },30000);

        return res.status(201).send(booking);

    }catch (err) {
        console.log("Error while initiating the booking", err.message);

        return res.status(500).send({
            message: "Some internal error"
        });
    }

}


 exports.updateTheBookingDetails = async (req, res) => {

    try{

        const booking = await Booking.findOne({
            _id: req.params.id
        });
    
        booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
        booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
        booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
        booking.totalCost = await calculateTheBookingCost(booking.theatreId, booking.noOfSeats);
    
        const updatedBookingObject = await booking.save();
    
        return res.status(200).send(updatedBookingObject);

    }catch(err){
        console.log("Error while updating booking details", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}