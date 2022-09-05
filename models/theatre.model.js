const  mongoose = require("mongoose");
const constants=require("../Utils/theatre.utils")
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
        required : true,
        // MORNING | NOON | EVENING | NIGHT
        default:constants.showTypes.morning,
        enum:[constants.showTypes.evening,constants.showTypes.morning,constants.showTypes.night,constants.showTypes.noon]
    },
    numberOfSeats : {
        type : Number,
        required : true
    }
},{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Theatre" , theatreSchema);