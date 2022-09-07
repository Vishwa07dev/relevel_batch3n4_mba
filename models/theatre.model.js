const  mongoose = require("mongoose");
const constants = require('../utils/constants');

const theatreSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pinCode : {
        type : Number,
        required : true
    },
    showTypes : {
        type : [String],
        enum : [constants.showTypes.morning, constants.showTypes.noon, constants.showTypes.evening, constants.showTypes.night],
        required : true
        //TODO : MORNING | NOON | EVENING | NIGHT
    },
    numberOfSeats : {
        type : Number,
        required : true
    }
},{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Theatre" , theatreSchema);