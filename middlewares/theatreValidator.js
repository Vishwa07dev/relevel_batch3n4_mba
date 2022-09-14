const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const constants = require("../utils/constants");
const checkObjectId = require("../utils/isValidObjId");

const showTypes = [
  constants.theatreShows.morning,
  constants.theatreShows.noon,
  constants.theatreShows.evening,
  constants.theatreShows.night,
];

function checkShows(given) {
  let temp = true;
  for (e of given) {
    if (!showTypes.includes(e)) {
      temp = false;
    }
  }
  return temp;
}

async function checkValidObjectIds(array) {
  let temp = { validIds: true, moviesExist: true };
  for (e of array) {
    if (!checkObjectId.isValidObjectId(e)) {
      temp.validIds = false;
    } else {
      const movie = await Movie.findOne({ _id: e });
      if (!movie) {
        temp.moviesExist = false;
      }
    }
  }
  return temp;
}

const isTheatreCreatedValid = async (req, res, next) => {
  if (req.user.userType == constants.userTypes.admin) {
    if (!req.body.ownerId) {
      return res.status(400).send({
        message: "OwnerId userId is not passed ",
      });
    } else {
      try {
        if (!checkObjectId.isValidObjectId(req.body.ownerId)) {
          return res.status(400).send({
            message: "Provided owner _id is invalid",
          });
        }
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
  } else if (typeof req.body.pinCode !== "number") {
    return res.status(400).send({
      message: "Failed ! Pin code is not in correct format (Number)",
    });
  }
  if (!req.body.showTypes) {
    return res.status(400).send({
      message: "showTypes is not passed ",
    });
  } else {
    if (!Array.isArray(req.body.showTypes)) {
      return res.status(400).send({
        message: "Failed ! Movie show types are not in correct format (Array)",
      });
    } else if (!checkShows(req.body.showTypes)) {
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
  } else if (typeof req.body.numberOfSeats !== "number") {
    return res.status(400).send({
      message: "Failed ! Number of seates is not in correct format (Number)",
    });
  }
  next();
};

const isValidTheatreId = async (req, res, next) => {
  try {
    if (!checkObjectId.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Provided _id is invalid",
      });
    }
    const theatre = await Theatre.findOne({ _id: req.params.id });

    console.log(theatre);
    if (!theatre) {
      return res.status(401).send({
        message: "Theatre Id passed is not valid Id",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal server error while validating the request",
      err,
    });
  }
};

const isValidTheatreEdit = async (req, res, next) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });
    moviesInTheatre = theatre.movies;
    if (req.body.addMovies) {
      if (!Array.isArray(req.body.addMovies)) {
        return res.status(400).send({
          message:
            "Failed ! Movie ids in addMovies are not in correct format (Array)",
        });
      }
      req.body.addMovies = req.body.addMovies.filter(
        (movieId) => !moviesInTheatre.includes(movieId)
      );

      const checker = await checkValidObjectIds(req.body.addMovies);

      if (!checker.validIds) {
        return res.status(400).send({
          message: "Failed ! Invalid movie id provided in addMovies",
        });
      } else if (!checker.moviesExist) {
        return res.status(400).send({
          message: "Failed ! Movie id provided in addMovies does not exist",
        });
      }
    }

    if (req.body.removeMovies) {
      if (!Array.isArray(req.body.removeMovies)) {
        return res.status(400).send({
          message:
            "Failed ! Movie ids in removeMovies are not in correct format (Array)",
        });
      }
      req.body.removeMovies = req.body.removeMovies.filter((movieId) =>
        moviesInTheatre.includes(movieId)
      );
      const checker = await checkValidObjectIds(req.body.removeMovies);

      if (!checker.validIds) {
        return res.status(400).send({
          message: "Failed ! Invalid movie id provided in removeMovies",
        });
      } else if (!checker.moviesExist) {
        return res.status(400).send({
          message: "Failed ! Movie id provided in removeMovies does not exist",
        });
      }
    }
    if (req.body.pinCode && typeof req.body.pinCode !== "number") {
      return res.status(400).send({
        message: "Failed ! Pin code is not in correct format (Number)",
      });
    }
    if (req.body.showTypes && !Array.isArray(req.body.showTypes)) {
      return res.status(400).send({
        message: "Failed ! Movie show types are not in correct format (Array)",
      });
    } else if (!checkShows(req.body.showTypes)) {
      return res.status(400).send({
        message:
          "showTypes provided is not correct. Possible correct values : MORNING  | NOON | EVENING | NIGHT",
      });
    }

    next();
  } catch (err) {
    console.log(
      "#### Error while validating edit movie in theatre request body ##### ",
      err.message
    );
    res.status(500).send({
      message:
        "Internal server error while edit movie in theatre body validation",
    });
  }
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
