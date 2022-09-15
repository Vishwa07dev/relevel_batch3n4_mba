const mongoose = require('mongoose');
const constants = require('../utils/constants');

const bookingSchema = new mongoose.Schema({

    totalCost :{
        type: Number,
        
    },

    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },

    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
    },

    time: {
        type: Date,

    },
    showTiming : {
        type: String,
        required : true
    },

    status:{
        type: String,
        default:constants.bookingStatus.in_progress,
        enum: [constants.bookingStatus.in_progress,
            constants.bookingStatus.completed,
            constants.bookingStatus.cancelled,
            constants.bookingStatus.failed] 
    },

    seats: {
        type: Number,
        required: true
    }
},

{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Booking" , bookingSchema);