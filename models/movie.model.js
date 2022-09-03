const mongoose = require("mongoose");

const movieSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    casts : {
        type : [String],
        required : true
    },
    trailerUrls : {
        type : [String],
        required : true
    },
    posterUrls : {
        type : [String],
        required : true
    },
    language : {
        type : String,
        required : true
    },
    releaseDate :{
        type : Date
    },
    releaseStatus : {
        type : String,
        required : true
        //TODO : Make it an enum RELEASED | COMING_SOON | BLOCKED
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ]
        //TODO : Make it as enum - COMEDY | ROMCOM | DRAMA | SCIFI | OFFBEAT
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);