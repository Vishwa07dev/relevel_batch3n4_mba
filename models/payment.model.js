const mongoose = require('mongoose');
const constants = require('../utils/constants')

const paymentSchema = mongoose.Schema({
    bookingId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        default: constants.paymentStatus.successful,
        enum: [constants.paymentStatus.failed, 
            constants.paymentStatus.pending, 
            constants.paymentStatus.successful
        ]
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }
},{ timestamp: true, versionKey : false })

module.exports = mongoose.model("Payment", paymentSchema)