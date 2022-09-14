const Bookings = require('../models/booking.model')
const Theatre = require('../models/theatre.model')
const User = require('../models/user.model')
const constants = require("../utils/constants")

exports.createBooking = async (req, res )=>{
    try{
        
        const theatre =  await Theatre.findById(req.body.theatreId);
        console.log(theatre.ticketPrice);
        const user = await User.findById(req.user);
        let bookingObj = {
            theatreId : req.body.theatreId,
            movieId : req.body.movieId,
            userId : req.user,
            noOfSeats : req.body.noOfSeats,
            totalCost : req.body.noOfSeats * theatre.ticketPrice
        }

        const ticketBooked = await Bookings.create(bookingObj);
        theatre.bookings.push(ticketBooked._id);
        user.ticketBooked.push(ticketBooked._id);

        await theatre.save();
        await user.save();


        res.status(201).send({
            message : "Successfully booked the Movie. please complete the payment",
            booking : ticketBooked
        })
    }catch(err){
        console.log("Some Error while creating booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}


exports.updateBooking = async (req, res )=>{
    try{
        const booking = await Bookings.findOne({_id : req.params.id});
        const theatre = await Theatre.findOne({_id : booking.theatreId});

        
        booking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats :  booking.noOfSeats ; 
        booking.totalCost = booking.noOfSeats * theatre.ticketPrice
        

        const ticketUpdated = await booking.save();

        res.status(200).send({
            message : "Successfully updated the booked the Movie. please complete the payment",
            booking : ticketUpdated
        })
    }catch(err){
        console.log("Some Error while creating booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}

exports.findOneBooking = async (req, res )=>{
    try{
        const booking = await Bookings.findOne({_id : req.params.id})

        res.status(200).send({
            message : "Successfully fetch the Booking details",
            booking : booking
        })

    }catch(err){
        console.log("Some Error while fetch booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}

exports.findAllBookings = async (req, res )=>{
    try{
        const booking = await Bookings.find()

        res.status(200).send({
            message : "Successfully fetch the Bookings details",
            booking : booking
        })

    }catch(err){
        console.log("Some Error while fetch booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}