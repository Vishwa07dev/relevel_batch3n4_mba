const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

const verifyTheatreAndMovie = async (req, res, next) => {
    try {

        if(req.body.theatreId && !req.body.movieId){

            return res.status(400).send({

                message: "Please provide movie id "
            })
        }

        if(!req.body.theatreId && req.body.movieId){

            return res.status(400).send({

                message: "Please provide theatre id "
            })
        }

        if(req.body.theatreId && req.body.movieId){

            const theatre = await Theatre.findOne({
                _id: req.body.theatreId
            });
    
            if (!theatre) {
                return res.status(400).send({
                    message: "Theatre Id is not valid"
                })
            }
    
            if(!theatre.movies.includes(req.body.movieId)){
                return res.status(400).send({
                    message: "Movie is not available in given theatre"
                });
            }

        }else {
            return res.status(400).send({
                message: "Please provide theatre id, and movie id... "
            })
        }

        next();

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error " + err.message 
        })
    }
};

const isAdminOrOwnerOfBooking = async (req, res, next) => {
    try {

        // check if ADMIN or USER is valid OWNER
        if(req.userInParams.userType != constants.userTypes.admin){
            if(req.booking.userId.valueOf() != req.userInParams._id.valueOf()){
                return res.status(400).send({
                    message: "Only the owner of the booking/admin has access to this operation"
                });
            }
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }
};

const verifyBooking = {
    verifyTheatreAndMovie: verifyTheatreAndMovie,
    isAdminOrOwnerOfBooking: isAdminOrOwnerOfBooking
};
module.exports = verifyBooking;