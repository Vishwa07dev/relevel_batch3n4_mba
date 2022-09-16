const mongoose = require('mongoose');
const { bookingStatus } = require('../utils/constants');
const bookingSchema = new mongoose.Schema({

    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Theatre",
        required: true
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movie",
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    timing: {
        type: Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },
    status: {
        type: String,
        enum: [bookingStatus.in_progress, bookingStatus.completed, bookingStatus.cancelled, bookingStatus.failed],
        default: bookingStatus.in_progress
    },
    noOfSeats: {
        type: Number,
        default: 1
    },
    totalCost: {
        type : Number,
        default: 0
    }
}, {
    timestamps: true, versionKey: false
});

module.exports = mongoose.model("Booking", bookingSchema);