const Movie = require('../models/movie.model');

const validateMovie = (req, res, next)=>{
    try{

        if(!req.body.name){
            res.status(400).send({
                message : "please provide the name !"
            });
            return;
        }
        if(!req.body.description){
            res.status(400).send({
                message : "please provide the description !"
            });
            return;
        }
        if(!req.body.casts){
            res.status(400).send({
                message : "please provide the casts !"
            });
            return;
        }
        if(!req.body.trailerUrls){
            res.status(400).send({
                message : "please provide the trailerUrls !"
            });
            return;
        }
        if(!req.body.posterUrls){
            res.status(400).send({
                message : "please provide the posterUrls !"
            });
            return;
        }
        if(!req.body.language){
            res.status(400).send({
                message : "please provide the language !"
            });
            return;
        }
        if(!req.body.releaseDate){
            res.status(400).send({
                message : "please provide the releaseDate !"
            });
            return;
        }
        if(!req.body.releaseStatus){
            res.status(400).send({
                message : "please provide the releaseStatus !"
            });
            return;
        }
        if(!req.body.imdbRating){
            res.status(400).send({
                message : "please provide the imdbRating !"
            });
            return;
        }
        if(!req.body.genre){
            res.status(400).send({
                message : "please provide the genre !"
            });
            return;
        }
        next();

    }catch(err){
        console.log(err);
    }
}

const movieValid = {
    validateMovie
}

module.exports = movieValid;