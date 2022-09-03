const mongoose = require("mongoose");
const constanst = require("../utils/constants")

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
        enum : [constanst.releaseStatus.released,
            constanst.releaseStatus.coming_soon,
            constanst.releaseStatus.blocked]
            //TODO : Make it an enum RELEASED | COMING_SOON | BLOCKED
        },
        imdbRating :{
            type : Number
        },
        genre : {
            type : String,
            required : true,
            enum : [constanst.genre.action, constanst.genre.comody, constanst.genre.drama,
                constanst.genre.horror, constanst.genre.romcom, constanst.genre.scifi]
        //TODO : Make it as enum - DRAMA | ACTION | COMEDY | ROMCOM | HORROR | SCI-FI
    }
},{ timestamps : true , versionKey : false});



module.exports = mongoose.model("Movie" , movieSchema);