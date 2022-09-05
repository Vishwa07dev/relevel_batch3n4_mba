const  mongoose = require("mongoose");

const constants = require('../utils/constants')

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
<<<<<<< HEAD
        type : String,
        required : true,
=======
        type : [String],
        required : true
>>>>>>> c367f7980aa44527fd42214ee422ef863118493b
        //TODO : MORNING | NOON | EVENING | NIGHT
        enum : [constants.showTypes.released,  constants.showTypes.noon, constants.showTypes.evening,   constants.showTypes.night]
    },
    numberOfSeats : {
        type : Number,
        required : true
    }
},{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Theatre" , theatreSchema);