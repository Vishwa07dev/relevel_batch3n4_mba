const mongoose = require("mongoose");
const {releaseStatuses, genres} = require("../utils/constants");

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
        enum : [releaseStatuses.released, releaseStatuses.coming_soon, releaseStatuses.blocked],
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum : [genres.action, genres.fiction, genres.comedy, genres.romcom, genres.drama, genres.scifi, genres.offbeat],
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);