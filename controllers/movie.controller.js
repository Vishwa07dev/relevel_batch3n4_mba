/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */
const Movie = require('../models/movie.model')


exports.createMovie = async (req, res) =>{
    try{
        const movieObj = {
            name : req.body.name,
            description : req.body.description,
            casts : [req.body.casts],
            trailerUrls : [req.body.trailerUrls],
            posterUrls : [req.body.posterUrls],
            language : req.body.language,
            releaseDate :req.body.date,
            releaseStatus : req.body.releaseStatus,
            genre : req.body.genre
        }
    
        const movie = await Movie.create(movieObj);
    
        res.status(201).send(movie);

    }catch(err){
        console.log("Some error happened while creating movie entry.", err.message);
        res.status(500).send({
            message: "Some internal error while creating movie entry."
        })
    }

}

exports.findAll = async (req, res) =>{

    try{
        const movie = await Movie.find();
    
        res.status(200).send(movie);

    }catch(err){
        console.log("Some error happened getting movies.", err.message);
        res.status(500).send({
            message: "Some internal error while getting movies."
        })
    }

}

//Function to find the movie by "movie object_id". 
exports.findById = async (req, res) =>{

    const movie = await Movie.findOne({"_id": req.params.id});

    if (movie == null) {
        return res.status(400).send({
            message: "Movie doesn't exist."
        })
    }

    res.status(200).send(movie);
}

exports.update = async (req, res) =>{
    
    try{
        const movie = await Movie.findOne({"_id": req.params.id});

        if (movie == null) {
            return res.status(400).send({
                message: "Movie doesn't exist."
            })
        }

        movie.name = req.body.name != undefined ? req.body.name : movie.name,
        movie.description = req.body.description != undefined ? req.body.description : movie.description,
        movie.casts = req.body.casts != undefined ? req.body.casts : movie.moviePriority,
        movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls : movie.trailerUrls,
        movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate,
        movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus,
        movie.genre = req.body.genre != undefined ? req.body.genre : movie.genre

        const updatedmovie = await movie.save();

        res.status(200).send(updatedmovie);

    }catch(err){
        console.log("Some error happened while updating movie details ", err.message);
        res.status(500).send({
            message: "Some internal error while updating the ticket"
        })
    }
}

exports.deletMovie = async (req, res) => {
    try {

        const movie = await Movie.findOne({
            _id: req.params.id
        });

        // check whether movie _id is valid or not
        if (movie == null) {
            return res.status(400).send({
                message: "Movie entry doesn't exist in the record."
            })
        }

        await movie.deleteOne();
        
        res.status(200).send({
            message : "Movie succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error."
        })
    }
}
