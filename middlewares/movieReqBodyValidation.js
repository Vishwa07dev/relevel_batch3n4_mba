const constants = require("../utils/constants");
const allowedReleaseStatuses = [constants.movieReleaseStatuses.released, constants.movieReleaseStatuses.coming_soon, constants.movieReleaseStatuses.blocked];

const validateMovieBody = (req,res,next)=>{

    try{

        if(!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Movie title is not provided"
            });
        }
    

        if(!req.body.description) {
            return res.status(400).send({
                message: "Failed ! Movie description is not provided"
            });
        }


        if(!req.body.casts) {
            return res.status(400).send({
                message: "Failed ! Movie casts are not provided"
            });
        }


        if(!req.body.trailerUrls) {
            return res.status(400).send({
                message: "Failed ! Movie trailers are not provided"
            });
        }


        if(!req.body.posterUrls) {
            return res.status(400).send({
                message: "Failed ! Movie posters are not provided"
            });
        }


        if(!req.body.languages) {
            return res.status(400).send({
                message: "Failed ! Movie languages are not provided"
            });
        }

        if(!req.body.releaseDate){
            return res.status(400).send({
                message: "Failed ! Movie release date is not provided"
            });
        }

        if(!req.body.releaseStatus){
            return res.status(400).send({
                message: "Failed ! Movie release status is not provided"
            });
        }else if (!allowedReleaseStatuses.includes(req.body.releaseStatus)){
            return res.status(400).send({
                message: "Failed ! invalid movie release status..."
            });
        }
    
        if(!req.body.imdbRating){
            return res.status(400).send({
                message: "Failed ! Movie imdb_rating is not provided"
            });
        }

        if (req.body.genre){
            return res.status(400).send({
                message: "Failed ! Movie genere are not provided"
            });
        }
    
        next();
    }catch{
        console.log("Error while velidating new movie request body", err.message);
        res.status(500).send({
            message : "Internal server error ..."
        });
    }
}

const validateMovieRequestBody = {
    validateMovieBody
}

module.exports = validateMovieRequestBody