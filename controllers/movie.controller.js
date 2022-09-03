const Movie = require('../models/movie.model');
/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */

exports.create = async (req, res) =>{
    try{

        let movieObj = {
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
        const movieCreated = await Movie.create(movieObj);
        res.status(200).send({
            message : "Movie Created Successfully",
            data : movieCreated
        })

    }catch(err){
        console.log("Some Internal error while create the movies !",err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}

exports.update = async (req, res) =>{
    try{
        const movie = await Movie.findById(req.body.params.id);

        movie.name = req.body.name ? req.body.name : movie.name;
        movie.description = req.body.description ? req.body.description  : movie.description;
        movie.casts = req.body.casts ? req.body.casts :  movie.casts;
        movie.trailerUrls = req.body.trailerUrls ? req.body.trailerUrls :  movie.trailerUrls;
        movie.posterUrls = req.body.posterUrls ? req.body.posterUrls :  movie.posterUrls;
        movie.language = req.body.language ? req.body.language : movie.language;
        movie.releaseDate = req.body.releaseDate ? req.body.releaseDate : movie.releaseDate;
        movie.imdbRating = req.body.imdbRating ? req.body.imdbRating : movie.imdbRating;
        movie.genre = req.body.genre ? req.body.genre : movie.genre;

        const updateMovie = await movie.save();

        res.status(200).send({
            message : "Movie updated Successfully",
            data : updateMovie
        })
    }catch(err){
        console.log("Some Internal error while create the movies !",err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}

exports.delete = async (req, res) =>{
    try{
        const deleteMovie = await movie.deleteOne({_id : req.params.id});

        res.status(200).send({
            message : "Succesfully delete the movie",
            data : deleteMovie
        })

    }catch(err){
        console.log("Some Internal error while fetching the movies !",err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}
exports.getMovieById = async (req, res) =>{
    try{
        const movie = await Movie.findById(req.body.params.id);
        if(movie == null){
            res.status(404).send({
                message : "Movie is not exists !"
            });
            return;
        }

        res.status(200).send({
            message : "Succesfully fetch the movie",
            data : movie
        })
    }catch(err){
        console.log("Some Internal error while fetching the movies !",err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}

exports.getAllMovies = async (req, res) =>{
    try{
        const movie = await Movie.find();

        res.status(200).send({
            message : "Succesfully fetch the movie",
            data : movie
        })

    }catch(err){
        console.log("Some Internal error while fetching the movies !",err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}