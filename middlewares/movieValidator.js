const Movie = require('../models/movie.model');
const {movieGenre} = require("../utils/constants");
const validMovieRequestBody = async (req, res, next)=>{
    try{
        if(!req.body.name){
            res.status(400).send({
                message : "Failed ! provide the Movie name "
            });
            return;
        }

        if(!req.body.description){
            res.status(400).send({
                message : "Failed ! provide the Movie description "
            });
            return;
        }

        if(!req.body.casts){
            res.status(400).send({
                message : "Failed ! provide the Movie casts "
            });
            return;
        }

        if(!req.body.trailerUrls){
            res.status(400).send({
                message : "Failed ! provide the Movie trailerUrls "
            });
            return;
        }

        if(!req.body.posterUrls){
            res.status(400).send({
                message : "Failed ! provide the Movie posterUrls "
            });
            return;
        }

        if(!req.body.languages){
            res.status(400).send({
                message : "Failed ! provide the Movie languages "
            });
            return;
        }

        if(!req.body.releaseDate){
            res.status(400).send({
                message : "Failed ! provide the Movie releaseDate "
            });
            return;
        }

        if(!req.body.releaseStatus){
            res.status(400).send({
                message : "Failed ! provide the Movie releaseStatus "
            });
            return;
        }

        if(!req.body.genre){
            res.status(400).send({
                message : "Failed ! provide the Movie genre "
            });
            return;
        }
        
        const genre = [movieGenre.action, movieGenre.comedy, movieGenre.drama, movieGenre.fantasy, movieGenre.horror, movieGenre.mystery, movieGenre.romance, movieGenre.thriller];
        // const result = isValidGenre(req.body.genre, genre);
        // console.log(result);
        if(!isValidGenre(req.body.genre, genre)){
            res.status(400).send({
                message : "genre should be : ACTION || COMEDY || DRAMA || FANTASY || HORROR || MYSTERY || ROMANCE || THRILLER "
            });
            return;
        }
        
        next();
        
    }catch(err){
        console.log("Some error while validating the movie request body !", err.message);
        res.status(400).send({
            message : "Some Internal Error !"
        })
    }
}
function isValidGenre(Genre, genre){
    for(let element of Genre){
        if(!genre.includes(element)){
            return false;
        }
    }
    return true;
}

const isValidMovie = async (req, res, next)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(movie == null){
            res.status(400).send({
                message : "Movie is not exist !"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Some Error while the Validating movie Id", err.message);
        res.status(500).send({
            message: "Some Internal Error !"
        });
    }
}

const movieRequestBody = {
    validMovieRequestBody,
    isValidMovie
}

module.exports = movieRequestBody;