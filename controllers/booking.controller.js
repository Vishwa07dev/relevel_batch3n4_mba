const mongoose=require("mongoose");
const Booking=require("../models/booking.model");

exports.createBooking=async (req,res)=>{
    const Body=req.body;
    const data={
        totalCost:Body.totalCost,
        theatreId:Body.theatreId,
        movieId:Body.movieId,
        userId:req.user._id,
        status:Body.status,
        noOfSeats:Body.noOfSeats
    }
    try
    {
        const bookings=await Booking.create(data);
        console.log(`#### Booking of movie with ${noOfSeats} is Done`)
        res.status(201).send(bookings)
    }catch(err)
    {
        console.log("#### Error while performing booking ####",err.message);
        res.status(500).send({
            message:"Internal Server error while performing booking"
        })
    }
}

exports.updateBooking=async (req,res)=>{
    try
    {
        const book=req.bookingInParams

        book.totalCost=req.body.totalCost!=undefined?req.body.totalCost:book.totalCost;
        book.theatreId=req.body.theatreId!=undefined?req.body.theatreId:book.theatreId;
        book.movieId=req.body.movieId!=undefined?req.body.movieId:book.movieId;
        book.userId=req.body.userId!=undefined?req.body.userId:book.userId;
        book.status=req.body.status!=undefined?req.body.status:book.status;
        book.noOfSeats=req.body.noOfSeats!=undefined?req.body.noOfSeats:book.noOfSeats;
    
        const updateBook=await book.save();
    
        res.status(200).send(updateBook)
    }catch(err)
    {
        console.log("#### Error wile  updating movie booking ####");
        res.status(200).send({
            message:"Internal server error while updating movie booking"
        })
    }
    
}

exports.getBooking=async (req,res)=>{
    try{
        
    const booking=req.bookingInParams;
    res.status(200).send(booking)
    }catch(err)
    {
        console.log("#### Error while getting booking of movie ####");
        res.status(500).send({
            message:"Internal server  error while getting movie booking"
        })
    }
}

exports.getAllBooking=async (req,res)=>{
    try
    {
        const booking=await Booking.find();

        res.status(200).send(booking);
    }catch(err)
    {
        console.log("#### Error while getting all movie booking ####");
        res.status(500).send({
            message:"Internal server Error while getting all movie booking"
        })
    }
}