const mongoose = require("mongoose");
const constants = require("../utils/constant")

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
        required : true,
        default : constants.releaseStatus.comingSoon,
        enum : [constants.releaseStatus.released,constants.releaseStatus.comingSoon,constants.releaseStatus.blocked]
        //TODO : Make it an enum RELEASED | COMING_SOON | BLOCKED
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum : [constants.genreTypes.action,constants.genreTypes.adventure,constants.genreTypes.comedy,
        constants.genreTypes.drama,constants.genreTypes.horror,constants.genreTypes.scifi]
        //TODO : Make it as enum - COMEDY | ROMCOM | DRAMA | SCIFI | OFFBEAT
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);