const  mongoose = require("mongoose");
const constants = require('../utils/constants')

const theatreSchema = new mongoose.Schema({

    ownerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user",
        required : true
    },
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
        enum : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night]
    },
    numberOfSeats : {
        type : Number,
        required : true
    },
    movies : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Movie"
    },
    bookings:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],
        ref:"booking"
    }
},{ timestamps : true , versionKey : false});

module.exports = mongoose.model("Theatre" , theatreSchema);