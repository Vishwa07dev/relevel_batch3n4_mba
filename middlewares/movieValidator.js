const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const constants = require("../utils/constants");

const isMovieCreatedValid = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name is not passed ",
    });
  }
  try {
    const movie = await Movie.findOne({ name: req.body.name });
    if (movie != null) {
      return res.status(400).send({
        message: "Failed ! movie name is already taken",
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
  if (!req.body.casts) {
    return res.status(400).send({
      message: "casts is not passed ",
    });
  }
  if (!req.body.trailerUrls) {
    return res.status(400).send({
      message: "trailerUrls is not passed ",
    });
  }
  if (!req.body.languages) {
    return res.status(400).send({
      message: "languages is not passed ",
    });
  }
  if (!req.body.releaseStatus) {
    return res.status(400).send({
      message: "releaseStatus is not passed ",
    });
  } else {
    const releaseStatus = [
      constants.movieReleaseStatuses.released,
      constants.movieReleaseStatuses.coming_soon,
      constants.movieReleaseStatuses.blocked,
    ];
    if (!releaseStatus.includes(req.body.releaseStatus)) {
      return res.status(400).send({
        message:
          "showTypes provided is not correct. Possible correct values : RELEASED  | COMING_SOON | BLOCKED",
      });
    }
  }
  if (req.body.genre) {
    const genres = [
      constants.movieGenre.action,
      constants.movieGenre.comedy,
      constants.movieGenre.drama,
      constants.movieGenre.fantasy,
      constants.movieGenre.horror,
      constants.movieGenre.mystery,
      constants.movieGenre.romance,
      constants.movieGenre.thriller,
    ];

    if (!genres.includes(req.body.genre)) {
      return res.status(400).send({
        message:
          "Genre provided is not correct. Possible correct values : ACTION  | COMEDY | DRAMA | FANTASY | HORROR | THRILLER | ROMANCE | MYSTERY",
      });
    }
  }
  next();
};

const isValidMovieId = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    console.log(movie);
    if (!movie) {
      return res.status(401).send({
        message: "Movie Id passed is not valid Movie Id",
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

const isValidMovieEdit = async (req, res, next) => {
  if (req.body.releaseStatus) {
    const releaseStatus = [
      constants.movieReleaseStatuses.released,
      constants.movieReleaseStatuses.coming_soon,
      constants.movieReleaseStatuses.blocked,
    ];
    console.log("testing");
    if (!releaseStatus.includes(req.body.releaseStatus)) {
      return res.status(400).send({
        message:
          "showTypes provided is not correct. Possible correct values : RELEASED  | COMING_SOON | BLOCKED",
      });
    }
  }
  if (req.body.genre) {
    const genres = [
      constants.movieGenre.action,
      constants.movieGenre.comedy,
      constants.movieGenre.drama,
      constants.movieGenre.fantasy,
      constants.movieGenre.horror,
      constants.movieGenre.mystery,
      constants.movieGenre.romance,
      constants.movieGenre.thriller,
    ];

    if (!genres.includes(req.body.genre)) {
      return res.status(400).send({
        message:
          "Genre provided is not correct. Possible correct values : ACTION  | COMEDY | DRAMA | FANTASY | HORROR | THRILLER | ROMANCE | MYSTERY",
      });
    }
  }

  next();
};

const verifyMovie = {
  isMovieCreatedValid: isMovieCreatedValid,
  isValidMovieId: isValidMovieId,
  isValidMovieEdit: isValidMovieEdit,
};

module.exports = verifyMovie;
