const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const constants = require("../utils/constants");
const objid = require("../utils/isValidObjId");

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
function checkGenre(given) {
  let temp = true;
  given.forEach((e) => {
    if (!genres.includes(e)) {
      temp = false;
    }
  });
  return temp;
}

async function checkValidObjectIds(array) {
  let temp = { validIds: true, thearteExist: true };
  for (e of array) {
    if (!checkObjectId.isValidObjectId(e)) {
      temp.validIds = false;
    } else {
      const theatre = await Theatre.findOne({ _id: e });
      if (!theatre) {
        temp.thearteExist = false;
      }
    }
  }
  return temp;
}

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
  } else if (!Array.isArray(req.body.casts)) {
    return res.status(400).send({
      message: "Failed ! Movie casts are not in correct format (Array)",
    });
  }

  if (!req.body.trailerUrls) {
    return res.status(400).send({
      message: "trailerUrls is not passed ",
    });
  } else if (!Array.isArray(req.body.trailerUrls)) {
    return res.status(400).send({
      message: "Failed ! Movie trailers are not in correct format (Array)",
    });
  }

  if (!req.body.languages) {
    return res.status(400).send({
      message: "languages is not passed ",
    });
  } else if (!Array.isArray(req.body.languages)) {
    return res.status(400).send({
      message: "Failed ! Movie languages are not in correct format (Array)",
    });
  }

  if (req.body.releaseDate && !isDate(req.body.releaseDate)) {
    return res.status(400).send({
      message: "Failed ! Movie release date is not in correct format (Date)",
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
    if (!Array.isArray(req.body.genre)) {
      return res.status(400).send({
        message: "Failed ! Movie genere are not in correct format (Array)",
      });
    } else if (!checkGenre(req.body.genre)) {
      return res.status(400).send({
        message: "Failed ! invalid movie release genre provided",
      });
    }
  }
  if (req.body.theatres) {
    const checker = await checkValidObjectIds(req.body.theatres);
    if (!checker.validIds) {
      return res.status(400).send({
        message: "Failed ! Invalid theatre _id provided in theatres",
      });
    } else if (!checker.moviesExist) {
      return res.status(400).send({
        message: "Failed ! theatre _id provided in theatres does not exist",
      });
    }
  }

  next();
};

const isValidMovieId = async (req, res, next) => {
  try {
    if (!objid.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Provided _id is invalid",
      });
    }

    const movie = await Movie.findOne({ _id: req.params.id });

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
  try {
    if (req.body.casts && !Array.isArray(req.body.casts)) {
      return res.status(400).send({
        message: "Failed ! Movie casts are not in correct format (Array)",
      });
    }

    if (req.body.trailerUrls && !Array.isArray(req.body.trailerUrls)) {
      return res.status(400).send({
        message: "Failed ! Movie trailers are not in correct format (Array)",
      });
    }

    if (req.body.posterUrls && !Array.isArray(req.body.posterUrls)) {
      return res.status(400).send({
        message: "Failed ! Movie posters are not in correct format (Array)",
      });
    }

    if (req.body.languages && !Array.isArray(req.body.languages)) {
      return res.status(400).send({
        message: "Failed ! Movie languages are not in correct format (Array)",
      });
    }

    if (req.body.releaseDate && !isDate(req.body.releaseDate)) {
      return res.status(400).send({
        message: "Failed ! Movie release date is not in correct format (Date)",
      });
    }

    if (req.body.imdbRating && typeof req.body.imdbRating !== "number") {
      return res.status(400).send({
        message: "Failed ! Movie IMDb rating is not in correct format (Number)",
      });
    }
    if (req.body.releaseStatus) {
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
      if (!Array.isArray(req.body.genre)) {
        return res.status(400).send({
          message: "Failed ! Movie genere are not in correct format (Array)",
        });
      } else if (!checkGenre(req.body.genre)) {
        return res.status(400).send({
          message: "Failed ! invalid movie release genre provided",
        });
      }
    }

    if (req.body.theatres) {
      const checker = await checkValidObjectIds(req.body.theatres);
      if (!checker.validIds) {
        return res.status(400).send({
          message: "Failed ! Invalid theatre _id provided in theatres",
        });
      } else if (!checker.moviesExist) {
        return res.status(400).send({
          message: "Failed ! theatre _id provided in theatres does not exist",
        });
      }
    }
    next();
  } catch {
    return res.status(500).send({
      message: "Internal server error while validating the request",
      err,
    });
  }
};
const verifyMovie = {
  isMovieCreatedValid: isMovieCreatedValid,
  isValidMovieId: isValidMovieId,
  isValidMovieEdit: isValidMovieEdit,
};

module.exports = verifyMovie;
