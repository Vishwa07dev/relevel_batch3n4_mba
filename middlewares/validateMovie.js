const Movie  = require('../models/movie.model');
const constants = require('../utils/constants');

const validateMovieReuestBody = (req, res, next) => {
    try{

        if(!req.body.name || !req.body.description || !req.body.casts || !req.body.trailerUrls || !req.body.posterUrls || !req.body.languages || !req.body.releaseStatus){
            return res.status(400).send({
                message : "Required field missed expecter field [name, description, casts, trailerUrls, posterUrls, languages, releaseStatus] "
            })
        }

        if(!Object.values(constants.movieReleaseStatuses).includes(req.body.releaseStatus)){
            return res.status(400).send({
                message : "Release status provided wrong expected release status [released,coming_soon,blocked] "
            })
        }

        next()

    }catch(err){
        console.log("error in validateMovieRequestBody");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const validateMovieId = async (req, res, next) => {
  try {
    if(!constants.isValidObjectId(req.params.id)){
        return res.status(400).send({
            message : " Id is Invalid"
        })
    }

    const movie = await Movie.findOne({_id : req.params.id});
        if(!movie){
            return res.status(400).send({
                message : "movie id is wrong"
            })
        }

    next();

  } catch (err) {
    console.log("error in validateMovieRequestBody");
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const validateMovie = {
    validateMovieReuestBody : validateMovieReuestBody,
    validateMovieId : validateMovieId
}
module.exports = validateMovie