const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id){

    if (ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

const createBookingBodyRequest = async (req, res, next) => {
    try{
        if(!req.body.theatreId){
            res.status(404).send({
                message : " TheatreId is not provided !"
            });
            return;
        }

        if(!isValidObjectId(req.body.theatreId)){
            res.status(404).send({
                message : " TheatreId is not Valid !"
            });
            return;
        }
        const theatre = await Theatre.findById(req.body.theatreId);

        if(theatre == null){
            res.status(404).send({
                message : "Theatre is not present !"
            })
        }

        if(!req.body.movieId){
            res.status(404).send({
                message : " movieId is not provided !"
            });
            return;
        }

        if(!isValidObjectId(req.body.movieId)){
            res.status(404).send({
                message : " movieId is not Valid !"
            });
            return;
        }

        const movie = await Movie.findById(req.body.movieId);
        if(movie == null){
            res.status(404).send({
                message : " movie not found !"
            })
        }

        if(!theatre.movies.includes(req.body.movieId)){
            res.status(404).send({
                message : "movie is not available at this theatre"
            });
            return;
        }

        if(!req.body.noOfSeats){
            res.status(404).send({
                message : "Please provide the number of seats !"
            });
            return;
        }

        if(req.body.noOfSeats < 1){
            res.status(404).send({
                message : "noOfSeats should be not negative !"
            });
            return;
        }
        req.theatre = theatre;
        req.movie = movie;
        next();

    }catch(err){
        console.log("Some Error while validatecreateBookingBodyRequest", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        });
    }
}

const validateBookingReqBodies = {
    createBookingBodyRequest : createBookingBodyRequest
};

module.exports = validateBookingReqBodies;