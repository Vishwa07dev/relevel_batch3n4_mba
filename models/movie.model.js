const mongoose = require("mongoose");
const constants = require('../utils/constants')

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
        enum : [constants.movieReleaseStatuses.released, constants.movieReleaseStatuses.coming_soon, constants.movieReleaseStatuses.blocked]
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum : [constants.movieGenre.action, constants.movieGenre.comedy, constants.movieGenre.drama, constants.movieGenre.fantasy, constants.movieGenre.horror, constants.movieGenre.mystery, constants.movieGenre.romance, constants.movieGenre.thriller]
    },
    theatres : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Theatre"
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);