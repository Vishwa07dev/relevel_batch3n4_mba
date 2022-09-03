/**
 * This file should have the controller methods to perform crud on
 * the movie resource
*/

const constants = require('../utils/constants');
const Movie = require('../models/movie.model');


exports.createMovie = async (req, res) => {
    try {

        const movideObj = {
            name : req.body.name,
            description : req.body.description,
            casts : req.body.casts,
            trailerUrls : req.body.trailerUrls,
            posterUrls : req.body.posterUrls,
            language : req.body.language,
            releaseDate : req.body.releaseDate,
            imdbRating : req.body.imdbRating,
            genre : req.body.genre
        }
        const movie = await Movie.create(movideObj);
        res.status(201).send(movie)

    }catch(err){
        console.log("error in creating movie" , err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.getAllMovies = async (req, res) => {
    try {


        // I assume that query should be on movie name
        const queryObj = {}
        if(req.query.name){
            queryObj.name = req.query.name
        }

        const movies = await Movie.find(queryObj);
        res.status(200).send(movies)

    }catch(err){
        console.log("error in getting all movie" , err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.getMoviesByMovideId = async (req, res) => {
    try {

        const movie = await Movie.findOne({_id : req.params.id});

        if(!movie){
            return res.status(400).send({
                message : "Failed !! Provided MovieId is invalid"
            })
        }
        res.status(200).send(movie)

    }catch(err){
        console.log("error in getting movie details by movie id" , err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.updateMovie = async (req, res) => {
    try {

        const movie = await Movie.findOne({_id : req.params.id})

        if(!movie){
            return res.status(400).send({
                message : "Failed !! MovieId is Invalid"
            })
        }

        movie.name = req.body.name != undefined ? req.body.name : movie.name;
        movie.description = req.body.description != undefined ? req.body.description : movie.description;
        
        movie.casts = req.body.casts != undefined ? req.body.casts : movie.casts;
        movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls : movie.trailerUrls;
        
        movie.posterUrls = req.body.posterUrls != undefined ? req.body.posterUrls : movie.posterUrls;
        movie.language = req.body.language != undefined ? req.body.language : movie.language;
        
        movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate;
        movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus;
        
        movie.imdbRating = req.body.imdbRating != undefined ? req.body.imdbRating : movie.imdbRating;
        movie.genre = req.body.genre != undefined ? req.body.genre : movie.genre;

        await movie.save();
        res.status(200).send(movie)


    }catch(err){
        console.log("error in updating movie" , err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}


exports.deleteMovie = async (req, res) => {
    try {

        const movie = await Movie.findOne({_id : req.params.id});

        if(!movie){
            return res.status(400).send({
                message : "Failed !! Provided MovieId is invalid"
            })
        }

        await Movie.deleteOne({_id : req.params.id})
        
        res.status(200).send({
            message : "Movie Deleted Successfully"
        })

    }catch(err){
        console.log("error in deleting movie" , err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}