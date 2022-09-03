/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */
const Movie = require('../models/movie.model');
const constants = require("../utils/constant");
var ObjectId = require('mongodb').ObjectId; 


exports.createMovie = async(req,res) => {
    try {

        let { 
            name, 
            description, 
            casts,
            trailerUrls,
            posterUrls,
            language,
            releaseDate,
            releaseStatus,
            imdbRating,
            genre
        } = req.body;

        const movieObject = {
            name, 
            description, 
            casts,
            trailerUrls,
            posterUrls,
            language,
            releaseDate,
            releaseStatus,
            imdbRating,
            genre
        }

        let movie = await Movie.create(movieObject);

        
        return res.status(201).send(movie);
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.getMovies = async(req,res) => {
    try {

        let movieId = req.params.movieId;
        let movie;

        if(movieId){
            movie = await Movie.findById(movieId);
        }else{
            movie = await Movie.find();
        }
        
        return res.status(201).send({
            message: movie.length === 0 ? 'No movies found' : 'Movies Data Fetched successfully',
            movie
        });
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.updateMovie = async(req,res) => {
    try {

        let movie = req.movieData;

        let { 
            name, 
            description, 
            casts,
            trailerUrls,
            posterUrls,
            language,
            releaseDate,
            releaseStatus,
            imdbRating,
            genre
        } = req.body;

        movie.name = name ? name : movie.name;
        movie.description = description ? description : movie.description;
        movie.casts = casts ? casts : movie.casts;
        movie.trailerUrls = trailerUrls ? trailerUrls : movie.trailerUrls;
        movie.posterUrls = posterUrls ? posterUrls : movie.posterUrls;
        movie.language = language ? language : movie.language;
        movie.releaseDate = releaseDate ? releaseDate : movie.releaseDate;
        movie.releaseStatus = releaseStatus ? releaseStatus : movie.releaseStatus;
        movie.imdbRating = imdbRating ? imdbRating : movie.imdbRating;
        movie.genre = genre ? genre : movie.genre;

        await movie.save();

        
        return res.status(201).send(movie);
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}


exports.deleteMovie = async(req,res) => {
    try {

        let movie = req.movieData;

        await movie.deleteOne({_id: movie._id})

        
        return res.status(201).send({
            message: 'Movie deleted successfully',
            movie
        });
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}