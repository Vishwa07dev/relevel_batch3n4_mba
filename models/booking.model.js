const mongoose = require("mongoose");
const constants = require('../utils/constants')

const bookingSchema  = new mongoose.Schema({
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
    movieId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Movie",
        required : true
    },
    seats :{
        type : Number,
        required : true
    },
    totalCost :{
        type : Number,
        required : true
    },
    bookingTime :{
        type : Date,
        immutable :true,
        required : true
    },
    bookingStatus : {
        type : String,
        required : true,
        default : constants.bookingStatuses.in_progress,
        enum : [constants.bookingStatuses.in_progress, constants.bookingStatuses.completed, constants.bookingStatuses.failed, constants.bookingStatuses.canceled]
    },
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Booking" , bookingSchema);