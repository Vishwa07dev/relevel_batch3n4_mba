const Movie = require('../models/movie.model');
const constants = require("../utils/constant");

exports.createMovieValidation = async(req,res, next) => {
    try {

        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Movie name is not provided"
            })
        }

        if (!req.body.description) {
            return res.status(400).send({
                message: "Failed ! Description is not provided"
            })
        }

        if (!req.body.casts) {
            return res.status(400).send({
                message: "Failed ! Casts is not provided"
            })
        }

        if (!req.body.trailerUrls) {
            return res.status(400).send({
                message: "Failed ! Trailer Url is not provided"
            })
        }

        if (!req.body.posterUrls) {
            return res.status(400).send({
                message: "Failed ! Poster Url is not provided"
            })
        }

        if (!req.body.language) {
            return res.status(400).send({
                message: "Failed ! Language is not provided"
            })
        }

        if (!req.body.releaseStatus) {
            return res.status(400).send({
                message: "Failed ! Release Status is not provided"
            })
        }

        let releaseStatus = [constants.releaseStatus.released,
        constants.releaseStatus.comingSoon,
        constants.releaseStatus.blocked,]

        if(!releaseStatus.includes(req.body.releaseStatus)){
            return res.status(400).send({
                message : "Release Status provided is not correct. Possible correct values : RELEASED | COMING SOON | BLOCKED"
            })
        }
    
        next();
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.deleteAndUpdateMovieValidation = async(req,res, next) => {
    try {
        let movieId = req.params.movieId;

        let movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(400).send({
                message: "No Movie found"
            })
        }

        req.movieData = movie;
        next();
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}