const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')
const Booking = require('../models/booking.model')
const constants = require('../utils/constants')
const checker = require('../utils/checker')

exports.createNewBooking = async (req,res)=>{
   try{
       const data = {
           userId : req.user.userType == constants.userTypes.admin ? req.body.userId : req.user._id,
           theatreId : req.body.theatreId,
           movieId : req.body.movieId,
           seats : req.body.seats,
           totalCost : req.body.seats * req.theatreOfBooking.ticketCost,
           bookingTime : Date.now(),
           bookingStatus : constants.bookingStatuses.in_progress
       }
   
       const booking = await Booking.create(data);

       req.user.bookings.push(booking._id);
       req.user.save();

       req.theatreOfBooking.bookings.push(booking._id);
       req.theatreOfBooking.save();

       req.movieOfBooking.bookings.push(booking._id);
       req.movieOfBooking.save();
       
       console.log(`#### New booking created ####`);
       res.status(201).send(booking);

       checker.checkBookingStatus(booking._id);

   }catch(err){
       console.log("#### Error while creating new booking #### ", err);
       res.status(500).send({
           message : "Internal server error while creating new booking"
       });
   }
}


exports.editBooking = async (req,res)=>{
   try{
       const booking = req.bookingInParams;

       if (req.body.theatreId){
        const oldTheatre = await Theatre.findOne({_id : booking.theatreId});

        await oldTheatre.bookings.remove(booking._id);
        booking.theatreId = req.body.theatreId;
        await req.theatreOfBooking.bookings.push(booking._id);

        await oldTheatre.save();
        await req.theatreOfBooking.save();
       }

       if (req.body.movieId){
        const oldMovie = await Movie.findOne({_id : booking.movieId});

        await oldMovie.bookings.remove(booking._id);
        booking.movieId = req.body.movieId;
        await req.movieOfBooking.bookings.push(booking._id);

        await oldMovie.save();
        await req.movieOfBooking.save();
       }

       booking.seats = req.body.seats ? req.body.seats : booking.seats
       booking.totalCost = booking.seats * req.theatreOfBooking.ticketCost
       booking.bookingStatus = req.body.bookingStatus ? req.body.bookingStatus : booking.bookingStatus

       const updatedBooking = await booking.save();

       console.log(`#### Booking data updated ####`);
       res.status(200).send(updatedBooking);
       
   }catch(err){
       console.log("#### Error while updating booking data #### ", err.message);
       res.status(500).send({
           message : "Internal server error while updating booking data"
       });
   }
}

exports.getAllBookings = async (req,res)=>{
   try{

    const queryObj = {}
    
    if(req.user.userType != constants.userTypes.admin){

        if(!req.user.bookings){
            return res.status(200).send({
                message : "No bookings created by the user yet"
            });
        }

        queryObj["_id"] = {$in : req.user.bookings};
    }

    const bookings = await Booking.find(queryObj);

    res.status(200).send(bookings);

   }catch(err){
       console.log("#### Error while getting all bookings ####", err.message);
       res.status(500).send({
           message : "Internal server error while getting all bookings"
       })
   }
}

exports.getSingleBooking = async (req,res)=>{

   try{
    const booking = req.bookingInParams;
   
       res.status(200).send(booking);
   
   }catch(err){
       console.log("#### Error while getting the booking ####", err.message);
       res.status(500).send({
           message : "Internal server error while getting the booking"
       })
   }

}
