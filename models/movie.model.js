const mongoose = require("mongoose");
const constants = require("../utils/constants");

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
        default : constants.releaseStatus.comming_soon,
        enum : [constants.releaseStatus.blocked, constants.releaseStatus.comming_soon, constants.releaseStatus.released]
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum : [constants.genre.comedy, constants.genre.drama, constants.genre.offbeat, constants.genre.romcom, constants.genre.scifi]
    }
    
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);