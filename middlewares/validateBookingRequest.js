const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')


const bookingReqValidator = async (req, res, next) => {

    const getTheatre = await Theatre.findOne({_id : req.body.theatreId})
    
    if(!getTheatre) return res.status(404).send({message: "Theatre not found."})
    
    const getMovie = await Movie.findOne({_id : req.body.movieId})
    
    if(!getMovie) return res.status(404).send({message: "Movie not found."})

    const movie = (getTheatre.movies.includes(getMovie._id))
    
    
    if(movie){
        next();
    } else{
        return res.status(404).send({message: "Movie not found in theatre."})
    }
}

const bookingReqBodyValidator = {
    bookingReqValidator
}

module.exports = bookingReqBodyValidator