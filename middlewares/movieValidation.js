const Movie=require("../models/movie.model");
const constants=require("../utils/constants")

const movieValidation=(req,res,next)=>{

    if(!req.body.name || req.body.name==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Name not Provided"
        })
    }

    if(!req.body.description || req.body.description==" ")
    {
        return res.status(400).send({
            message:"Failed!!! description not Provided"
        })
    }

    if(!req.body.casts || req.body.casts==" ")
    {
        return res.status(400).send({
            message:"Failed!!! casts not Provided"
        })
    }

    if(!req.body.trailerUrls || req.body.trailerUrls==" ")
    {
        return res.status(400).send({
            message:"Failed!!! trailerUrls not Provided"
        })
    }

    if(!req.body.posterUrls || req.body.posterUrls==" ")
    {
        return res.status(400).send({
            message:"Failed!!! posterUrls not Provided"
        })
    }

    if(!req.body.languages || req.body.languages==" ")
    {
        return res.status(400).send({
            message:"Failed!!! languages not Provided"
        })
    }

    if(!req.body.releaseDate || req.body.releaseDate==" ")
    {
        return res.status(400).send({
            message:"Failed!!! releaseDate not Provided"
        })
    }

    if(!req.body.releaseStatus || req.body.releaseStatus==" ")
    {
        return res.status(400).send({
            message:"Failed!!! releaseStatus not Provided"
        })
    }

    const status=[constants.movieReleaseStatuses.blocked,constants.movieReleaseStatuses.coming_soon,constants.movieReleaseStatuses.released]
    if(!status.includes(req.body.releaseStatus))
    {
        return res.status(400).send({
            message:"Failed!!!Invalid releaseStatus provided"
        })
    }


    if(!req.body.imdbRating || req.body.imdbRating==" ")
    {
        return res.status(400).send({
            message:"Failed!!! imdbRating not Provided"
        })
    }

    if(!req.body.genre || req.body.genre==" ")
    {
        return res.status(400).send({
            message:"Failed!!! genre not Provided"
        })
    }

    const genre=[constants.movieGenre.action,constants.movieGenre.comedy,constants.movieGenre.drama,constants.movieGenre.fantasy,constants.movieGenre.horror,constants.movieGenre.mystery,constants.movieGenre.romance,constants.movieGenre.thriller]
    if(!genre.includes(req.body.genre))
    {
        return res.status(400).send({
            message:"Failed!!! Invalid genre provided"
        })
    }

    next();
}


const isValid={
    movieValidation
}

module.exports=isValid