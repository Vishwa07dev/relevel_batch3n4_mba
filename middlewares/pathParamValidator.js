const constants = require("../utils/constants");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

exports.validateUserId = async (req, res, next) => {

    let userId = req.params.id;

    if(!isValidObjectId(userId)){
        return res.status(400).send({
            message: "User Id is not a valid ID...!"
        })
    }

    const user = await User.findOne({ _id : userId })

    if (!user) {
        return res.status(400).send({
            message: "User Not Found...!"
        })
    }

    next();

}

exports.validateMovieId = async (req, res, next) => {

    let movieId = req.params.id;

    if(!isValidObjectId(movieId)){
        return res.status(400).send({
            message: "Movie Id is not a valid ID...!"
        })
    }

    const movie = await Movie.findOne({ _id : movieId })

    if (!movie) {
        return res.status(400).send({
            message: "Movie Not Found...!"
        })
    }
    req.movie = movie;

    next();

}

exports.validateTheatreId = async (req, res, next) => {

    let theatreId = req.params.id;

    if(!isValidObjectId(theatreId)){
        return res.status(400).send({
            message: "Theatre Id is not a valid ID...!"
        })
    }

    const theatre = await Theatre.findOne({ _id : theatreId })

    if (!theatre) {
        return res.status(400).send({
            message: "Theatre Not Found...!"
        })
    }
    req.theatre = theatre;

    next();

}