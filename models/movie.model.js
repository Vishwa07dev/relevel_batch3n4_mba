const mongoose = require("mongoose");
<<<<<<< HEAD
const constants=require("../Utils/movie.utils")
=======
const constants = require('../utils/constants')
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d

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
        default:constants.releaseStatus.coming_soon,
        enum:[constants.releaseStatus.blocked,constants.releaseStatus.coming_soon,constants.releaseStatus.release]
=======
        enum : [constants.movieReleaseStatuses.released, constants.movieReleaseStatuses.coming_soon, constants.movieReleaseStatuses.blocked]
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
<<<<<<< HEAD
        enum:[constants.genre.comedy,constants.genre.drama,constants.genre.offbeat,constants.genre.romcom,constants.genre.scifi]
=======
        enum : [constants.movieGenre.action, constants.movieGenre.comedy, constants.movieGenre.drama, constants.movieGenre.fantasy, constants.movieGenre.horror, constants.movieGenre.mystery, constants.movieGenre.romance, constants.movieGenre.thriller]
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);