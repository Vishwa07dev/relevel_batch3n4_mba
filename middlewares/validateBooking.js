const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");



const validateBody = async (req, res, next) => {
  try {

    if (!req.body.totalCost) {
        return res.status(400).send({
            message: "Failed ! Movie totalCost is not provided"
        });

    } else if (isNaN(req.body.totalCost)) {
        return res.status(400).send({
            message: "Failed ! total cost is not a valid price"
        });
    }

    if(!req.body.movieId) {
        return res.status(400).send({
            message: "Failed ! MovieId is not provided"
        });
    }

    if (!req.body.theatreId ) {
        return res.status(400).send({
            message: "Failed ! theatreId is not provided"
        });
    }

    if (!req.body.timing) {
        return res.status(400).send({
            message: "Failed ! timing is not provided"
        })

    }else if (!constants.isDate(req.body.timing)) {
        return res.status(400).send({
          message: "Provided timimg is invalid"
        });
    }
    

    if (!req.body.numberOfSeats) {
        return res.status(400).send({
            message: "Failed ! numberOfSeats is not provided",
        });

    } else if (isNaN(req.body.numberOfSeats)) {
        return res.status(400).send({
            message: "Failed ! numberOfSeats  is not a valid Number"
        });
    }

    if(!constants.isValidObjectId(req.body.movieId)){
        return res.status(400).send({
            message : "Movie Id is Wrong"
        })
    }
    const movie = await Movie.findOne({ _id: req.body.movieId });
    

    if (!movie) {
        return res.status(400).send({
            message: "Movie Id is Invalid "
        });
    }

    if(!constants.isValidObjectId(req.body.theatreId)){
        return res.status(400).send({
            message : "Theatre Id is Wrong"
        })
    }
    const theatre = await Theatre.findOne({ _id: req.body.theatreId });
    if (!theatre) {
        return res.status(400).send({
            message: "Theatre Id is Invalid "
        });
    }

    next();

    }catch (err) {
        console.log("error in validating Booking body", err.message);
        res.status(500).send({
        message: "Internal Server Error"
        });
    }
};
const validateBodyWhileUpdate = async (req, res, next) => {
  try {

    if (req.body.totalCost && isNaN(req.body.totalCost)) {
      return res.status(400).send({
        message: "Failed ! total cost is not a valid price",
      });
    }

    
    if (req.body.numberOfSeats && isNaN(req.body.numberOfSeats)) {
        return res.status(400).send({
          message: "Failed ! numberOfSeats is not a valid seat No",
        });
    }

    if (req.body.movieId) {

        if(!constants.isValidObjectId(req.body.movieId)){
            return res.status(400).send({
                message : "Movie Id is Wrong"
            })
        }

        const movie = await Movie.findOne({ _id: req.body.movieId });

        if(!movie) {
            return res.status(400).send({
            message: "Movie Id is Invalid "
            });
        }
    }

    if (req.body.theatreId) {

        if(!constants.isValidObjectId(req.body.theatreId)){
            return res.status(400).send({
                message : "Theatre Id is Wrong"
            })
        }
        const theatre = await Theatre.findOne({ _id: req.body.theatreId });

        if(!theatre) {
            return res.status(400).send({
            message: "Theatre Id is Invalid "
            });
        }
    }

    if(req.body.bookingStatus){
        if(!Object.values(constants.bookingStatus).includes(req.body.bookingStatus)){
            return res.status(400).send({
                message : "Booking Status is Invalid"
            })
        }
    }

    if(req.body.timing && !constants.isDate(req.body.timing)){
        return res.status(400).send({
            message : "Timing is not valid data type"
        })
    }

    next()

  } catch (err) {
    console.log("error in validating booking body while updating", err.message);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

const validateBookingRequestBodies = {
  validateBody,
  validateBodyWhileUpdate,
};

module.exports = validateBookingRequestBodies;
