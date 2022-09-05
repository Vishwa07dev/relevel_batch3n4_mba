const mongoose = require("mongoose");
<<<<<<< HEAD
const constants = require("../utils/constants");
=======
const constants = require('../utils/constants')
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83

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
    languages : {
        type : [String],
        required : true
    },
    releaseDate :{
        type : Date
    },
    releaseStatus : {
        type : String,
        required : true,
<<<<<<< HEAD
        default : constants.releaseStatus.comming_soon,
        enum : [constants.releaseStatus.blocked, constants.releaseStatus.comming_soon, constants.releaseStatus.released]
=======
        enum : [constants.movieReleaseStatuses.released, constants.movieReleaseStatuses.coming_soon, constants.movieReleaseStatuses.blocked]
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
<<<<<<< HEAD
        enum : [constants.genre.comedy, constants.genre.drama, constants.genre.offbeat, constants.genre.romcom, constants.genre.scifi]
=======
        enum : [constants.movieGenre.action, constants.movieGenre.comedy, constants.movieGenre.drama, constants.movieGenre.fantasy, constants.movieGenre.horror, constants.movieGenre.mystery, constants.movieGenre.romance, constants.movieGenre.thriller]
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83
    }
    
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);