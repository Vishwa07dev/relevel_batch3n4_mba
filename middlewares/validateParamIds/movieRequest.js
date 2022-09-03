//this file contains the logic to validate the id passed in  params along with request coming for movie resource

const Movie = require("../../models/movie.model");
const { isValidObjectId } = require("mongoose");

const isValidMovieIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "No movieId passed as parameter.",
    });
  }
  //check whether movieId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Not a valid movieId.",
    });
  }
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (movie == null) {
      return res.status(400).json({
        message: "Not a valid movieId.",
      });
    }
    //valid movieId,pass the control to next
    //can pass the movie details, so can be used later in movie updation and getting specific movie detail
    req.movie = movie;
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).json({
      message: "Internal server error while accessing the  data.",
    });
  }
  
};

module.exports = { isValidMovieIdInReqParam };
