const Booking = require('../models/booking.model');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');
const constants = require('../utils/constants');
const User = require('../models/user.model')

exports.createBooking = async (req, res) => {
    try{
        const user = await User.findOne({_id : req.user._id})
        const bookingObj = {
            totalCost : req.body.totalCost,
            userId : req.user._id,
            movieId : req.body.movieId,
            theatreId : req.body.theatreId,
            timing : req.body.timing,
            numberOfSeats : req.body.numberOfSeats
        }


        const booking = await Booking.create(bookingObj);
        user.bookings.push(booking._id);
        await user.save();

        res.status(201).send(booking)

        setTimeout( async () => {

            let temp = await Booking.findOne({_id : booking._id})
            if(temp.bookingStatus === constants.bookingStatus.in_progress){
                temp.bookingStatus = constants.bookingStatus.cancelled
                
                temp.save();
            }

        }, 1000 * 2* 60)


    }catch(err){
        console.log("error in booking creation", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.updateBooking = async (req, res) => {
    try{
        const booking = await Booking.findOne({_id : req.params.id});

        booking.totalCost = req.body.totalCost ? req.body.totalCost : booking.totalCost,
        booking.movieId = req.body.movieId ? req.body.movieId : booking.movieId,
        booking.userId = req.body.userId ? req.body.userId : booking.userId,
        booking.theatreId = req.body.theatreId ? req.body.theatreId : booking.theatreId
        booking.timing = req.body.timing ? req.body.timing : booking.timing,
        booking.bookingStatus = req.body.bookingStatus ? req.body.bookingStatus : booking.bookingStatus,
        booking.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : booking.numberOfSeats
        

        const updatedBooking = await booking.save();
        res.status(200).send(updatedBooking)
        
    }catch(err){
        console.log("error in booking update", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.getAllBooking =  async(req, res) => {
    try{
        const queryObj = {}
        
        if(req.user.userType != constants.userTypes.admin){
           queryObj._id = req.user.bookings
        }
        const myBookings = await Booking.find(queryObj)
        res.status(200).send(myBookings)

    }catch(err){
        console.log("error in fetch all booking ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.getBookingById = async (req, res) => {
    try{
        const booking = await Booking.findOne({_id : req.params.id});
        res.status(200).send(booking)
        
    }catch(err){
        console.log("error in fetch all booking by Id ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}