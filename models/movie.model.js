const mongoose = require("mongoose");
const constants = require("../utils/constant");

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
        type : String
    },
    releaseStatus : {
        type : String,
        required : true,
        enum: [
            constants.releaseStatus.released,
            constants.releaseStatus.comingSoon,
            constants.releaseStatus.blocked,
        ]
        //TODO : Make it an enum RELEASED | COMING_SOON | BLOCKED
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum: [
            constants.genre.comedy,
            constants.genre.romcom,
            constants.genre.drama,
            constants.genre.scifi,
            constants.genre.offBeat,
        ]
        //TODO : Make it as enum - COMEDY | ROMCOM | DRAMA | SCIFI | OFFBEAT
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);