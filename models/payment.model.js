const constants = require('../utils/constants');
 const mongoose = require('mongoose');
 
 
 const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : "Booking"
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    amount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        required : true,
        default: constants.paymentStatus.successful,
        enum: [constants.paymentStatus.successful, constants.paymentStatus.failed]
    }
 }, { timestamps : true , versionKey : false});
 
 module.exports = mongoose.model("Payment", paymentSchema);