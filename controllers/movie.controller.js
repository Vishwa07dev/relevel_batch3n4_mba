/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */
const Movie = require("../models/movie.model");
exports.createMovie = async (req, res) => {
  const movieObj = {
    name: req.body.name,
    description: req.body.description,
    casts: req.body.casts.split(","),
    trailerUrls: req.body.trailerUrls.split(","),
    posterUrls: req.body.posterUrls.split(","),
    language: req.body.language.split(","),
    releaseDate: req.body.releaseDate,
    releaseStatus: req.body.releaseStatus,
    genre: req.body.genre.split(","),
  };
  try {
    const movie = await Movie.create(movieObj);
    return res.status(201).json({ data: movie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error occured." });
  }
};


 
exports.findAllMovies = async (req, res) => {
  try {
    let queryObj = {};
    //add optional query
    if (req.query) {
      addOptionalQuery(req, queryObj);
    }
    const movies = await Movie.find(queryObj);
    return res
      .status(200)
      .json({ data: movies, totalDocumentCount: movies.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error occured." });
  }
};
exports.findMovieById = async (req, res) => {
  try {
    return res.status(200).json({ data: req.movie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error occured." });
  }
};
exports.updateMovie = async (req, res) => {
  try {
    //update the req.movie
    updateRequestMovieObject(req);
    const updatedMovie = await req.movie.save(); //update in db
    return res.status(200).json({ data: updatedMovie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error occured." });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    await req.movie.remove(); //remove the movie in db
    return res.status(200).json({ message: "Succesfully deleted movie" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error occured." });
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} queryObj
 * @details To add optional query to queryObject
 */
function addOptionalQuery(req, queryObj) {
  if (req.query.name) {
    queryObj.name = req.query.name;
  }
  if (req.query.casts) {
    //{casts:{$in:[list of casts name]}
    //{casts:{$in:req.query.casts.split(",")}}
    queryObj.casts = { $in: req.query.casts.split(",") };
  }
  if (req.query.language) {
    queryObj.language = { $in: req.query.language.split(",") };
  }
  if (req.query.genre) {
    queryObj.genre = { $in: req.query.genre.split(",") };
  }
  if (req.query.releaseStatus) {
    queryObj.releaseStatus = req.query.releaseStatus;
  }
  if (req.query.releaseDate) {
    queryObj.releaseDate = req.query.releaseDate;
  }
}

/**
 *
 * @param {Object} req
 * @detail Function to update the request movie object property values if needed(in case provided in request body)
 */
function updateRequestMovieObject(req) {
  req.movie.name = req.body.name !== undefined ? req.body.name : req.movie.name;
  req.movie.description =
    req.body.description !== undefined
      ? req.body.description
      : req.movie.description;
  req.movie.casts =
    req.body.casts !== undefined ? req.body.casts.split(",") : req.movie.casts;
  req.movie.trailerUrls =
    req.body.trailerUrls !== undefined
      ? req.body.trailerUrls.split(",")
      : req.movie.trailerUrls;
  req.movie.posterUrls =
    req.body.posterUrls !== undefined
      ? req.body.posterUrls.split(",")
      : req.movie.posterUrls;
  req.movie.language =
    req.body.language !== undefined
      ? req.body.language.split(",")
      : req.movie.language;
  req.movie.releaseDate =
    req.body.releaseDate !== undefined
      ? req.body.releaseDate
      : req.movie.releaseDate;
  req.movie.releaseStatus =
    req.body.releaseStatus !== undefined
      ? req.body.releaseStatus
      : req.movie.releaseStatus;
  req.movie.imdbRating =
    req.body.imdbRating !== undefined
      ? req.body.imdbRating
      : req.movie.imdbRating;
  req.movie.genre =
    req.body.genre !== undefined ? req.body.genre.split(",") : req.movie.genre;
}
