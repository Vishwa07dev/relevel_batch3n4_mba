const constants = require("../utils/constants");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");
var getMoviesTheatre = [];

const isDate = (date) => {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};
// const allowedBookingStatus = [
//   constants.bookingStatus.canceled,
//   constants.bookingStatus.completed,
//   constants.bookingStatus.failed,
//   constants.bookingStatus.in_progress,
// ];

function isValidObjectId(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new mongoose.Types.ObjectId.isValid(id)) === id) return true;
    //console.log("Here");
    return false;
  }
  return false;
}

const newBookingBody = async (req, res, next) => {
  if (!req.body.totalCost) {
    return res.status(400).send({
      message: "Failed ! Movie title is not provided",
    });
  } else if (typeof req.body.totalCost !== "number") {
    return res.status(400).send({
      message: "Failed ! Booking totalCost not in correct format (Number)",
    });
  }

  //   if (!req.body.timing) {
  //     return res.status(400).send({
  //       message: "Failed ! Booking timing is not provided",
  //     });
  //   } else if (!isDate(req.body.timing)) {
  //     return res.status(400).send({
  //       message: "Failed ! Booking timing  is not in correct format (Date)",
  //     });
  //   }

  try {
    if (!req.body.theatreId) {
      return res.status(400).send({
        message: "Failed ! Booking theatreId is not provided",
      });
    } else if (req.body.theatreId) {
      if (!isValidObjectId(req.body.theatreId)) {
        return res.status(400).send({
          message: "Failed ! Invalid Booking theatreId provided",
        });
      } else {
        const theatre = await Theatre.findOne({ _id: req.body.theatreId });
        if (!theatre) {
          return res.status(400).send({
            message: "Failed ! Booking theatreId provided does not exist",
          });
        } else {
          getMoviesTheatre = [...theatre.movies];
        }
      }
    }
    if (!req.body.movieId) {
      return res.status(400).send({
        message: "Failed ! Booking movieId is not provided",
      });
    } else if (req.body.movieId) {
      if (!isValidObjectId(req.body.movieId)) {
        return res.status(400).send({
          message: "Failed ! Invalid Booking movieId provided",
        });
      } else {
        const movie = await Movie.findOne({ _id: req.body.movieId });
        if (!movie) {
          return res.status(400).send({
            message: "Failed ! Booking movieId provided does not exist",
          });
        } else {
          if (!getMoviesTheatre.includes(movie._id)) {
            return res.status(400).send({
              message: "Failed ! Movie id does not exits in current theatre",
            });
          }
        }
      }
    }
  } catch {
    console.log(
      "#### Error while validating new Booking request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while new Booking body validation",
    });
  }
};

const isValidBookingId = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "Failed ! id is not provided",
      });
    } else if (req.params.id) {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).send({
          message: "Failed ! Invalid Booking id provided",
        });
      } else {
        const booking = await Booking.findOne({ _id: req.body.movieId });
        if (!booking) {
          return res.status(400).send({
            message: "Failed ! id provided does not exist",
          });
        }
      }
    }
  } catch {
    console.log(
      "#### Error while validating new Booking id ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while  Booking id validation",
    });
  }
};

const editBookingBody = async (req, res, next) => {
  if (req.body.totalCost && typeof req.body.totalCost !== "number") {
    return res.status(400).send({
      message: "Failed ! Booking totalCost not in correct format (Number)",
    });
  }

  if (req.body.timing && !isDate(req.body.timing)) {
    return res.status(400).send({
      message: "Failed ! Booking timing  is not in correct format (Date)",
    });
  }

  //   if (req.body.status && !allowedBookingStatus.includes(req.body.status)) {
  //     return res.status(400).send({
  //       message: "Failed ! Invalid movie  status provided",
  //     });
  //   }

  try {
    if (req.body.theatreId) {
      if (!isValidObjectId(req.body.theatreId)) {
        return res.status(400).send({
          message: "Failed ! Invalid Booking theatreId provided",
        });
      } else {
        const theatre = await Theatre.findOne({ _id: req.body.theatreId });
        if (!theatre) {
          return res.status(400).send({
            message: "Failed ! Booking theatreId provided does not exist",
          });
        }
      }
    }
    if (req.body.movieId) {
      if (!isValidObjectId(req.body.movieId)) {
        return res.status(400).send({
          message: "Failed ! Invalid Booking movieId provided",
        });
      } else {
        const movie = await Movie.findOne({ _id: req.body.movieId });
        if (!movie) {
          return res.status(400).send({
            message: "Failed ! Booking movieId provided does not exist",
          });
        }
      }
    }
  } catch {
    console.log(
      "#### Error while validating edit Booking request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while edit Booking body validation",
    });
  }
};

const validateBookingRequestBodies = {
  editBookingBody,
  isValidBookingId,
  newBookingBody,
};

module.exports = validateBookingRequestBodies;
