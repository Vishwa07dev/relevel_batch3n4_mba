const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const constants = require("../utils/constants");

const isTheatreCreatedValid = async (req, res, next) => {
  if (req.user.userType == constants.userTypes.admin) {
    if (!req.body.ownerId) {
      return res.status(400).send({
        message: "OwnerId userId is not passed ",
      });
    } else {
      try {
        const theatreOwner = await User.findOne({ _id: req.body.ownerId });
        if (!theatreOwner) {
          return res.status(401).send({
            message: "OwnerId passed is not valid userID",
          });
        } else if (theatreOwner.userType != constants.userTypes.theatre_owner) {
          return res.status(401).send({
            message: "OwnerId passed is not valid theatreOwner Id",
          });
        }
      } catch (err) {
        return res.status(500).send({
          message: "Internal server error while validating the request",
        });
      }
    }
  }
  if (!req.body.name) {
    return res.status(400).send({
      message: "name is not passed ",
    });
  }
  try {
    const theatre = await Theatre.findOne({ name: req.body.name });
    if (theatre != null) {
      return res.status(400).send({
        message: "Failed ! theatre name is already taken",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error while validating the request",
    });
  }
  if (!req.body.description) {
    return res.status(400).send({
      message: "description  is not passed ",
    });
  }
  if (!req.body.city) {
    return res.status(400).send({
      message: "city is not passed ",
    });
  }
  if (!req.body.pinCode) {
    return res.status(400).send({
      message: "pinCode is not passed ",
    });
  }
  if (!req.body.showTypes) {
    return res.status(400).send({
      message: "showTypes is not passed ",
    });
  } else {
    const showTypes = [
      constants.theatreShows.morning,
      constants.theatreShows.noon,
      constants.theatreShows.evening,
      constants.theatreShows.night,
    ];
    if (!showTypes.includes(req.body.showTypes)) {
      return res.status(400).send({
        message:
          "showTypes provided is not correct. Possible correct values : MORNING  | NOON | EVENING | NIGHT",
      });
    }
  }
  if (!req.body.numberOfSeats) {
    return res.status(400).send({
      message: "numberOfSeats is not passed ",
    });
  }
  next();
};

const isValidTheatreId = async (req, res, next) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });
    if (!theatre) {
      return res.status(401).send({
        message: "Theatre Id passed is not valid Id",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error while validating the request",
      err,
    });
  }
};

const isValidTheatreEdit = async (req, res, next) => {
  if (req.body.showTypes) {
    const showTypes = [
      constants.theatreShows.morning,
      constants.theatreShows.noon,
      constants.theatreShows.evening,
      constants.theatreShows.night,
    ];
    if (!showTypes.includes(req.body.showTypes)) {
      return res.status(400).send({
        message:
          "showTypes provided is not correct. Possible correct values : MORNING  | NOON | EVENING | NIGHT",
      });
    }
  }
  next();
};

const havingMovieInTheare = async (req, res, next) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });

    if (!theatre.movies.length) {
      console.log(theatre);
      return res.status(200).send({
        message: "This Theatre_Owner did'nt added  movies yet ",
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error while validating the request",
      err,
    });
  }
};

const verifyTheatre = {
  isTheatreCreatedValid: isTheatreCreatedValid,
  isValidTheatreEdit: isValidTheatreEdit,
  isValidTheatreId: isValidTheatreId,
  havingMovieInTheare: havingMovieInTheare,
};

module.exports = verifyTheatre;
