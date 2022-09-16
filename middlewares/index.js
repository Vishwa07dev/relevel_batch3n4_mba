const authJwt = require("./authjwt");
const validateIdInParams = require("./paramsVerifier");
const validateUserRequestBodies = require("./validateUserRequestBodies");
const validateMovieRequestBodies = require("./validateMovieRequestBodies");
const validateTheatreRequestBodies = require("./validateTheatreRequestBodies");
const validateBookingRequestBodies = require("./validateBookingRequestBodies");

module.exports = {
  authJwt,
  validateIdInParams,
  validateUserRequestBodies,
  validateMovieRequestBodies,
  validateTheatreRequestBodies,
  validateBookingRequestBodies
};
