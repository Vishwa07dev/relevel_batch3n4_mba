const mongoose = require('mongoose');
const constants = require('../utils/constants')

const paymentSchema = new mongoose.Schema({
    
    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Booking"
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : [constants.paymentStatus.failed, constants.paymentStatus.completed]
    }
},{
    timeStamps : true, versionKey : false
});

module.exports = mongoose.model("Payment", paymentSchema);