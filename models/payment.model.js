const constants = require('../utils/constants');
 const mongoose = require('mongoose');
 
 
 const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : "Booking"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required : true,
        enum: [constants.paymentStatuses.success, constants.paymentStatuses.failed]
    }
 }, { timestamps : true , versionKey : false});
 
 module.exports = mongoose.model("Payment", paymentSchema);