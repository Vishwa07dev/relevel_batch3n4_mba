const Movie = require('../models/movie.model');



const verifyMovieRequestBody = async (req,res,next) =>{

    
    const movie = await Movie.findOne({name : req.body.name});
    if(movie != null){
        return res.status(400).send({
            message : "movie with this name already patent"
        })
    } 

    if(!req.body.name){
        return res.status(400).send({
            message : "Movie name is not provided"
        })
    }

    if(!req.body.description){
        return res.status(400).send({
            message : "description is not provided"
        })
    }

    if(!req.body.casts){
        return res.status(400).send({
            message :"casts are not provided"
        })
    }

    if(!req.body.trailerUrls){
        return res.status(400).send({
            message : "trailerUrls are not provided"
        })
    }

    if(!req.body.posterUrls){
        return res.status(400).send({
            message : "PosterUrls are not provided"
        })
    }

    if(!req.body.languages){
        return res.status(400).send({
            message : "Language is not provided"
        })
    }

    if(!req.body.releaseDate){
        return res.status(400).send({
            message : "ReleaseDate is not provided"
        })
    }
    if(!req.body.releaseStatus){
        return res.status(400).send({
            message : "ReleaseStatus is not provided"
        })
    }
    
    if(!req.body.imdbRating){
        return res.status(400).send({
            message : "imdbRating is not provided"
        })
    }
    
    if(!req.body.genre){
        return res.status(400).send({
            message : "Genre is not provided"
        })
    }

    
    
    next();
    
}

const verifyMovieParam = async (req,res,next) =>{

    const movie = await Movie.findOne({_id:req.params.id})
    const nameQP = req.query.nameQP
    if(movie == null && !nameQP){
        return res.status(400).send({
            message: "Movie is not found" 
        })
    }
    next();
}

const verifyMovie =  {
    verifyMovieRequestBody : verifyMovieRequestBody,
    verifyMovieParam : verifyMovieParam
}
module.exports = verifyMovie