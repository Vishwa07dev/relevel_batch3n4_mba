const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const User = require("../models/user.model")

const { default: mongoose } = require("mongoose");
const constants = require("../utils/constants");

const validateMovieId = async (req, res, next) => {
  if (!req.body.movieId) {
    return res.status(400).send({ message: "Provide a valid MovieId" });
  }
  if (!mongoose.isValidObjectId(req.body.movieId)) {
    return res.status(400).send({ message: "Provide a valid MovieId" });
  }
  let movieExists;
  try {
    movieExists = await Movie.findOne({ _id: req.body.movieId });
    if (!movieExists) {
      return res.status(400).send("This id is invalid");
    } else {
      req.movieInBody = movieExists;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error please try again later");
  }
};
const validateTheatreId = async (req, res, next) => {
  if (!req.body.theatreId) {
    return res.status(400).send({ message: "Provide a valid theatreId" });
  }

  if (!mongoose.isValidObjectId(req.body.theatreId)) {
    return res.status(400).send({ message: "Provide a valid theatreId" });
  }
  let theatreExists;
  try {
    theatreExists = await Theatre.findOne({ _id: req.body.theatreId });
    if (!theatreExists) {
      return res.status(400).send("This id is invalid");
    } else {
      req.theatreInBody = theatreExists;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error please try again later");
  }
};
const validateCreateBooking = async (req, res, next) => {
    if(req.user.userType == constants.userTypes.admin){
        if(!req.body.userId){
            return res.status(400).send("Please provide a userId")
        }
        let userExists;
        try{
            userExists = await User.findOne({_id:req.body.userId})
            if(!userExists){
                return res.status(400).send("Invalid userId provided")
            }
            else{
                req.userInBody = userExists
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).send("Internal server error")
        }
    }
  if (!req.theatreInBody.movies.includes(req.body.movieId)) {
    return res.status(400).send({
      message: `${req.theatreInBody.name}  is not currently running this movie`,
    });
  }
  if (!totalCost || totalCost < 100) {
    return res
      .status(400)
      .send(
        "You have to provide a total cost incurred which should be more than 100"
      );
  }
  if (!noOfSeats || noOfSeats > 10 || noOfSeats < 0) {
    return res
      .status(400)
      .send(
        "You have to provide a total number of seats you want which should be between 1 and 10"
      );
  }
  if (!timing) {
    return res
      .status(400)
      .send(
        "You have to provide timing of the show in form of 'Month-Date-Year"
      );
  }
  try {
    req.body.timing = new Date(req.body.timing);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "You have to provide timing of the show in form of 'Month-Date-Year"
      );
  }
  let checkHours = new Date();
  if (!(req.body.timing - checkHours) / 3600000 > 1) {
    return res
      .status(400)
      .send("You have to book atleast an hour before the show");
  }
  next();
};

const validateBookingRequestBody = {
  validateMovieId,
  validateTheatreId,
  validateCreateBooking,
};

module.exports = validateBookingRequestBody