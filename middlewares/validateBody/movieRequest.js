//this file contains the logic to validate the request body coming for movie resource

const trimValuesInRequestBody = require("../../utils/trimRequestBody");
const { movieGenres, movieReleaseStatuses } = require("../../utils/constants");
exports.validateMovieRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req); //to remove unwanted spaces

  const {
    name,
    description,
    casts,
    trailerUrls,
    posterUrls,
    language,
    releaseStatus,
    genre,
  } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Name is required field and is not provided.",
    });
  }
  if (!description) {
    return res.status(400).json({
      message: "description is required field and is not provided.",
    });
  }
  if (!casts) {
    return res.status(400).json({
      message: "casts is required field and is not provided.",
    });
  }
  if (!trailerUrls) {
    return res.status(400).json({
      message: "trailerUrls is required field and is not provided.",
    });
  }
  if (!posterUrls) {
    return res.status(400).json({
      message: "posterUrls is required field and is not provided.",
    });
  }
  if (!language) {
    return res.status(400).json({
      message: "language is required field and is not provided.",
    });
  }
  if (!genre) {
    return res.status(400).json({
      message: "genre is required field and is not provided.",
    });
  }
  //ensure genre provided is valid one of predefined enum value
  const providedGenres = genre.split(",");
  const allowedGenres = Object.values(movieGenres);
  for (const item of providedGenres) {
    if (!allowedGenres.includes(item)) {
      return res.status(400).json({
        message:
          "Movie genre  provided value is not valid.Allowed values are: COMEDY | ROMCOM | DRAMA |ROMANTIC| SCIFI | OFFBEAT |ACTION |CRIME |THRILLER. Ensure to provide no space between these allowed values,while sending.",
      });
    }
  }

  //ensure release status must be of valid enum value,in case not mentioned, defaultEnum value will be taken

  if (
    releaseStatus &&
    !Object.values(movieReleaseStatuses).includes(releaseStatus)
  ) {
    //ensure release status must be of valid enum value,in case not mentioned, defaultEnum value will be taken
    return res.status(400).json({
      message:
        "Movie release status  provided value is not valid.Allowed values are: RELEASED | COMING_SOON | BLOCKED",
    });
  }
  //all validation passed
  next();
};

exports.validateMovieUpdateRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req); //to remove unwanted spaces

  const {
    name,
    description,
    casts,
    trailerUrls,
    posterUrls,
    releaseDate,
    releaseStatus,
    imdbRating,
    language,
    genre,
  } = req.body;
  if (name == "") {
    return res.status(400).json({
      message: "Name can't be empty",
    });
  }
  if (description == "") {
    return res.status(400).json({
      message: "description can't be empty",
    });
  }
  if (casts == "") {
    return res.status(400).json({
      message: "casts can't be empty.",
    });
  }
  if (trailerUrls == "") {
    return res.status(400).json({
      message: "trailerUrls can't be empty.",
    });
  }
  if (posterUrls == "") {
    return res.status(400).json({
      message: "posterUrls can't be empty.",
    });
  }
  if (language == "") {
    return res.status(400).json({
      message: "language can't be empty.",
    });
  }
  if (genre == "") {
    return res.status(400).json({
      message: "genre can't be empty.",
    });
  }
  if (releaseDate == "") {
    return res.status(400).json({
      message: "releaseDate can't be empty.",
    });
  }
  if (releaseStatus == "") {
    return res.status(400).json({
      message: "releaseStatus can't be empty.",
    });
  }
  if (imdbRating == "") {
    return res.status(400).json({
      message: "imdbRating can't be empty.",
    });
  }
  if (genre) {
    //ensure genre provided is valid one of predefined enum value
    const providedGenres = genre.split(",");
    const allowedGenres = Object.values(movieGenres);
    for (const item of providedGenres) {
      if (!allowedGenres.includes(item)) {
        return res.status(400).json({
          message:
            "Movie genre  provided value is not valid.Allowed values are: COMEDY | ROMCOM | DRAMA |ROMANTIC| SCIFI | OFFBEAT |ACTION |CRIME |THRILLER. Ensure to provide no space between these allowed values,while sending.",
        });
      }
    }
  }

  //ensure release status must be of valid enum value,in case not mentioned, defaultEnum value will be taken

  if (
    releaseStatus &&
    !Object.values(movieReleaseStatuses).includes(releaseStatus)
  ) {
    //ensure release status must be of valid enum value,in case not mentioned, defaultEnum value will be taken
    return res.status(400).json({
      message:
        "Movie release status  provided value is not valid.Allowed values are: RELEASED | COMING_SOON | BLOCKED",
    });
  }

  //all validation passed
  next();
};
