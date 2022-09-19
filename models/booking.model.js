const  mongoose = require("mongoose");
const constants = require('../utils/constants');

const bookingSchema = new mongoose.Schema({

    totalCost : {
        type : Number,
        required : true
    },
    movieId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Movie",
        required : true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
    },
    theatreId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Theatre",
        required : true
    },
    timing : {
        type : Date,
        required : true
    },
    bookingStatus : {
        type : String,
        default : constants.bookingStatus.in_progress,
        enum : [constants.bookingStatus.complete, constants.bookingStatus.in_progress, constants.bookingStatus.cancelled, constants.bookingStatus.failed]
    },
    numberOfSeats : {
        type : Number,
        required : true
    }
},{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Booking" , bookingSchema);