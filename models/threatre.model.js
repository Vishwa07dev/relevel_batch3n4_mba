
const mongoose = require("mongoose");
const threatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    NumberOfSeat: {
        type: Number,
        required: true
    },
    showTypes: {
        type: String,
        required: true,
        enum: [morning, Noon, evening, night]
    }
}, { timestamps: true, versionKey: false })
module.exports = mongoose.model("threatre", threatreSchema);
