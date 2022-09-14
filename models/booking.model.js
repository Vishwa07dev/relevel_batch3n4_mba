const constants = require('../utils/constants');
 const mongoose = require('mongoose');
 
 
 const bookingSchema = new mongoose.Schema({
    totalCost: {
        type: Number,
        required: true
    },
    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Theatre"
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Movie"
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    showTime: {
        type: Date,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [constants.bookingStatus.cancelled, constants.bookingStatus.completed, constants.bookingStatus.failed, constants.bookingStatus.inProgress],
        default: constants.bookingStatus.inProgress
    }
 }, { timestamps : true , versionKey : false});
 
 module.exports = mongoose.model("Booking", bookingSchema);