const Bookings = require('../models/booking.model')
const Theatre = require('../models/theatre.model')
const User = require('../models/user.model')
const constants = require("../utils/constants")

exports.createBooking = async (req, res )=>{
    try{
        
        const theatre = req.theatre;
        console.log(theatre.ticketPrice);
        const user = await User.findById(req.user);
        let bookingObj = {
            theatreId : theatre._id,
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
        setTimeout(()=>{
            checkStatus(ticketBooked._id)
        }, 120000)//120000 = 2 Minutes
        res.status(201).send({
            message : "Successfully booked the Movie. please complete the payment",
            booking : ticketBooked
        });
    }catch(err){
        console.log("Some Error while creating booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}

async function checkStatus(id){
    try{
        console.log("Checking status of " + id)
        let booking = await Bookings.findOne({_id : id});
        if(booking.status == constants.bookingStatus.in_progress){
            booking.status = constants.bookingStatus.failed
        }else{
            return;
        }
        await booking.save();

    }catch(err){
        console.log("Some Error while Checking Status", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}
exports.updateBooking = async (req, res )=>{
    try{
        const booking = req.bookingInParams;
        const theatre = await Theatre.findOne({_id : booking.theatreId});
        console.log(booking.theatreId);
        console.log(theatre.ticketPrice)
        if(req.user.userType == constants.userTypes.customer && req.body.bookingStatus == constants.bookingStatus.cancelled){
            booking.status = req.body.status ? req.body.status : booking.status

        }else if(req.user.userType == constants.userTypes.theatre_owner ){

            booking.timing = req.body.timing ? req.body.timing : booking.timing,
            booking.status = req.body.status ? req.body.status : booking.status,
            booking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : booking.noOfSeats
            booking.totalCost = theatre.ticketPrice * req.body.noOfSeats;

        }else if(req.user.userType == constants.userTypes.admin){

            booking.movieId = req.body.movieId ? req.body.movieId : booking.movieId,
            booking.userId = req.body.userId ? req.body.userId : booking.userId,
            booking.theatreId = req.body.theatreId ? req.body.theatreId : booking.theatreId
            booking.timing = req.body.timing ? req.body.timing : booking.timing,
            booking.status = req.body.status ? req.body.status : booking.status,
            booking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : booking.noOfSeats
            booking.totalCost = theatre.ticketPrice * req.body.noOfSeats;

        }

        const updatedBooking = await booking.save();
        res.status(200).send(updatedBooking)
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
        const user = req.user;
        var qureyObj = {};
        if(user.userType == constants.userTypes.customer){
            if(!user.ticketBooked){
                res.status(404).send({
                    message : "No ticket booked by the user yet."
                });
                return;
            }
            qureyObj["_id"] = { $in : user.ticketBooked };
        } else if(user.userType == constants.userTypes.theatre_owner){
            if(!user.theatresOwned){
                res.status(404).send({
                    message : "you don't have any theatre's"
                });
                return;
            }
            qureyObj["theatreId"] = { $in : user.theatresOwned };

        }
        const bookings = await Bookings.find(qureyObj);

        console.log(bookings);
        res.status(200).send({
            message : "Successfully fetch the Bookings details",
            booking : bookings
        })

    }catch(err){
        console.log("Some Error while fetch booking", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}