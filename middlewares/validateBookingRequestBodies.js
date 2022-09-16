const User = require('../models/user.model');
const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')
const constants = require("../utils/constants");
const checker = require('../utils/checker')

const newBookingBody = async (req,res,next) => {
    try{

        if (req.user.userType == constants.userTypes.admin){
            if (!req.body.userId){
                return res.status(400).send({
                    message: "Failed ! Booking userId is not provided"
                });
            }else {
                if(!checker.isValidObjectId(req.body.userId)){
                    return res.status(400).send({
                        message: "Failed ! Invalid booking userId provided"
                    });
                }else{
                    const user = await User.findOne({_id : req.body.userId})
                    if (!user){
                        return res.status(400).send({
                            message: "Failed ! booking userId provided does not exist"
                        });
                    }else if(user.userType != constants.userTypes.customer){
                        return res.status(400).send({
                            message: "Failed ! booking userId provided is not a customer"
                        });
                    }
                }
            }
        }
        

        if (!req.body.theatreId){
            return res.status(400).send({
                message: "Failed ! TheatreId is not provided"
            });
        }else if (!checker.isValidObjectId(req.body.theatreId)){
            return res.status(400).send({
                message: "Failed ! Invalid theatreId provided"
            });
        }else {
            const theatre = await Theatre.findOne({_id : req.body.theatreId});
            if (!theatre){
                return res.status(400).send({
                    message: "Failed ! TheatreId provided does not exist"
                });
            }
            req.theatreOfBooking = theatre;
        }

        if (!req.body.movieId){
            return res.status(400).send({
                message: "Failed ! movieId is not provided"
            });
        }else if (!checker.isValidObjectId(req.body.movieId)){
            return res.status(400).send({
                message: "Failed ! Invalid movieId provided"
            });
        }else {
            const movie = await Movie.findOne({_id : req.body.movieId});
            if (!movie){
                return res.status(400).send({
                    message: "Failed ! movieId provided does not exist"
                });
            }else if (!req.theatreOfBooking.movies.includes(movie._id)){
                return res.status(400).send({
                    message: "Failed ! movieId provided is not released in this theatre"
                });
            }
            req.movieOfBooking = movie;
        }

        if (!req.body.seats) {
            return res.status(400).send({
                message: "Failed ! Seats is not provided"
            });
        }else if (typeof req.body.seats !== "number"){
            return res.status(400).send({
                message: "Failed ! Seats is not in correct format (Number)"
            });
        }else if (req.body.seats > req.theatreOfBooking.numberOfSeats){
            return res.status(400).send({
                message: `Failed ! Only ${req.theatreOfBooking.numberOfSeats} seats are available`
            });
        }

        next();

    }catch{
        console.log("#### Error while velidating new booking request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while new booking body validation"
        });
    }
}

const editBookingBody = async (req,res,next) => {
    try{

        let theatre;
        
        if (req.body.theatreId){
            if (!checker.isValidObjectId(req.body.theatreId)){
                return res.status(400).send({
                    message: "Failed ! Invalid theatreId provided"
                });
            }

            theatre = await Theatre.findOne({_id : req.body.theatreId});

            if (!theatre){
                return res.status(400).send({
                    message: "Failed ! TheatreId provided does not exist"
                });
            }
            if (!req.body.movieId && !theatre.movies.includes(req.bookingInParams.movieId)){
                return res.status(400).send({
                    message: "Failed ! current movieId is not present in the new theatre"
                });
            }

        }else{
            theatre = await Theatre.findOne({_id : req.bookingInParams.theatreId});
        }

        req.theatreOfBooking = theatre;

        if (req.body.movieId){
            if (!checker.isValidObjectId(req.body.movieId)){
                return res.status(400).send({
                    message: "Failed ! Invalid movieId provided"
                });
            }else {
                const movie = await Movie.findOne({_id : req.body.movieId});
                if (!movie){
                    return res.status(400).send({
                        message: "Failed ! movieId provided does not exist"
                    });
                }else if (!theatre.movies.includes(movie._id)){
                    return res.status(400).send({
                        message: "Failed ! movieId provided is not released in this theatre"
                    });
                }
                req.movieOfBooking = movie;
            }
        }

        if (req.body.seats){
            
            if(typeof req.body.seats !== "number"){
                return res.status(400).send({
                    message: "Failed ! Seats is not in correct format (Number)"
                });
            }else if (req.body.seats > theatre.numberOfSeats){
                return res.status(400).send({
                    message: `Failed ! Only ${theatre.numberOfSeats} seats are available`
                });
            }
            
        }else if (req.bookingInParams.seats > theatre.numberOfSeats){
            return res.status(400).send({
                message: `Failed ! Only ${theatre.numberOfSeats} seats are available`
            });
        }

        if (req.body.bookingStatus){

            const allowedBookingStatuses = Object.values(constants.bookingStatuses)

            if (req.user.userType == constants.userTypes.customer){
                if (req.body.bookingStatus == constants.bookingStatuses.canceled){
                    if (req.bookingInParams.bookingStatus == constants.bookingStatuses.failed){
                        return res.status(403).send({
                            message: "Failed ! You cannot change booking status now"
                        });
                    }
                }else {
                    return res.status(401).send({
                        message: "only ADMIN is allowed to perform this action"
                    });
                }
            }

            if (!allowedBookingStatuses.includes(req.body.bookingStatus)){
                return res.status(400).send({
                    message: "Failed ! Booking status provided is invalid"
                });
            }
        }

        next();


    }catch{
        console.log("#### Error while velidating edit booking request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while edit booking body validation"
        });
    }
}

const validateBookingRequestBodies = {
    newBookingBody,
    editBookingBody
}

module.exports = validateBookingRequestBodies