const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const checker = require('../utils/checker');
const sendNotificationReq = require('../utils/sendEmailRequest')

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
        await req.user.save();

        req.bookedMovie.bookings.push(booking._id);
        await req.bookedMovie.save();

        res.status(201).send(booking);

        checker.checkBookingStatus(booking._id, req.user);

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
        if(updatedBookingObject.status == constants.bookingStatuses.cancelled){
            sendNotificationReq.bookingCancelled(req.user.email)
        }
    
        return res.status(200).send(updatedBookingObject);

    }catch(err){

        console.log("Error while updating booking details", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}