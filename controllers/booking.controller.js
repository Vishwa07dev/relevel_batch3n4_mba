const mongoose = require("mongoose")
const Booking = require('../models/booking.model');
const { deleteOne } = require('../models/theatre.model');
const User = require('../models/user.model');
const constants = require('../utils/constants')

exports.createBooking = async (req, res) => {

    const bookingObj = {
        totalCost: req.body.totalCost,
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: req.user,
        time: Date.now(),
        showTiming: req.body.showTiming,
        seats : req.body.seats
    }

    const booking = await Booking.create(bookingObj)

    const user = await User.findOne({"_id":req.user})

    user.bookings.push(booking._id);
    await user.save();

    res.status(201).send(booking)
    
    setTimeout(async ()=>{
        if(booking.status = constants.bookingStatus.in_progress){
        booking.status = constants.bookingStatus.cancelled
        } 
        await booking.save();
        return console.log("Booking cancelled. Booking Time exceeded.")
    }, 120000)
  
}

exports.getAllBookings = async (req, res) => {

    const user = req.user;
    const customerBookings = await Booking.find({"userId" : user._id})
    console.log(customerBookings);
    
    if (user && user.userType == constants.userTypes.admin){
        const allBookings = await Booking.find();
        return res.status(200).send(allBookings)

    }else if (customerBookings.length != 0){
        
        return res.status(200).send(customerBookings)    

    }else{

        return res.status(403).send({
            message : "User is not ADMIN or users User has no bookings yet."
        })
    }
}

exports.getBookingById = async (req, res) => {

    const user = await User.findOne({_id : req.user});
       
    const getBooking = await Booking.findById({_id : req.params.id});
    
    if (user && user.userType == constants.userTypes.admin){
       return res.status(200).send(getBooking)
    }


    if(user.bookings.includes(getBooking._id)){
        return res.status(200).send(getBooking)
    } else{
        return res.status(200).send({
            message: "Not a Admin OR Booking Id is not related to the requested user."
        })
    } 
}

exports.updateBooking = async (req, res) => {
    
    try{
        const booking = await Booking.findOne({_id: req.params.id})

        if(req.user == "admin"){
            booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId,
            booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId,
            booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId,
            booking.showTiming = req.body.showTiming != undefined ? req.body.showTiming : booking.showTiming
            booking.status = req.body.status != undefined ? req.body.status : booking.status
            booking.seats = req.body.seats != undefined ? req.body.seats : booking.seats
        }
        console.log(req.user)
        
        const user = await User.findOne({userId : req.user});
        console.log(user)
        console.log(user.userType)

        const cbooking = await Booking.findOne({_id : req.params.id});
        console.log(cbooking);        
        console.log(cbooking._id);        
               
        if(user.bookings.includes(cbooking._id) && user.userType == "CUSTOMER"){
            booking.showTiming = req.body.showTiming != undefined ? req.body.showTiming : booking.showTiming
            booking.status = req.body.status != undefined ? req.body.status : booking.status
        } else{
            return res.status(200).send({
                message: "Not a Admin OR Booking Id is not related to the requested user."
            })
        }
        const updatedbooking = await booking.save();
    
        res.status(200).send(updatedbooking);   

    } catch (err) {
        console.log("Some error while updating booking.", err.message);
        res.status(500).send({
            message: "Some internal error while updating the booking."
        })
    }
}

/** Facing the following issue while updating the booking:::-
 * 
 * Some error while updating booking. Cast to string failed for value "{
  _id: new ObjectId("632314b7f217605364f9006a"),
  name: 'Dharmit Customer',
  userId: 'customer1',
  password: '$2a$08$IX0EveHfe3FBqZK7z4PS7.l7eE1gp1vChxeh1gDwPNjwAecXEFJQ2',
  email: 'dharmit@customer.com',
  userType: 'CUSTOMER',
  userStatus: 'APPROVED',
  theatresOwned: [],
  bookings: [ new ObjectId("632314f0f217605364f90081") ],
  createdAt: 2022-09-15T12:04:07.114Z,
  updatedAt: 2022-09-15T12:05:04.893Z
}" (type Object) at path "userId" for model "user" 
 *  
 */


exports.deleteBooking = async (req, res) => {
    
    try{
        const booking = await Booking.findOne({_id: req.params.id})

        await booking.deleteOne();
    
        res.status(200).send({
            message: "Booking deleted."
        })   

    } catch (err) {
        console.log("Some error while deleting the booking.", err.message);
        res.status(500).send({
            message: "Some internal error while deleting the booking."
        })
    }
}


