const Movie = require("../models/movie.model");
const {releaseStatuses, genres} = require("../utils/constants");

const isValidParamsId = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({_id : req.params.id});
        
        if(!movie){
            return res.status(400).send({
                message : `No such movie with id ${req.params.id} in the database.`
            })
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

const isDeleted = async (req, res, next) => {
    try{
        const movie = await Movie.findOne({_id : req.params.id});

        if(movie.isDeleted == true){
            return res.status(200).send({
                message : `Movie with id ${req.params.id} is not available in the theatres anymore.`
            })
        }

        req.movie = movie;
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

const isValidReleaseStatus = async (req, res, next) => {
    try{
        if(req.body.releaseStatus){
            const releaseStatusArr = [releaseStatuses.released, releaseStatuses.coming_soon, releaseStatuses.blocked];
            if(!releaseStatusArr.includes(req.body.releaseStatus)){
                return res.status(400).send({
                    message : `${req.body.releaseStatus} is not a valid release status.`
                })
            }
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

const isValidGenre = async (req, res, next) => {
    try{
        if(req.body.genre){
            const genreArr = [genres.action, genres.fiction, genres.comedy, genres.romcom, genres.drama, genres.scifi, genres.offbeat];
            if(req.body.genre.every(g => !genreArr.includes(g))){
                return res.status(400).send({
                    message : `Array contains one or more invalid movie genre.`
                })
            }
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

module.exports = {isValidParamsId, isDeleted, isValidReleaseStatus, isValidGenre}; 