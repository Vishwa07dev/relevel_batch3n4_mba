const mongoose = require("mongoose");
const {releaseStatus , gerne} = require('../utils/constant');
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
        enum : [ releaseStatus.released, releaseStatus.coming_soon, releaseStatus.blocked]
        //TODO : Make it an enum RELEASED | COMING_SOON | BLOCKED
    },
    imdbRating :{
        type : Number
    },
    genre : {
        type : [ String ],
        enum : [ gerne.comedy, gerne.romcom, gerne.drama, gerne.sci_fi, gerne.offbeat, gerne.romance]
        //TODO : Make it as enum - COMEDY | ROMCOM | DRAMA | SCIFI | OFFBEAT
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);