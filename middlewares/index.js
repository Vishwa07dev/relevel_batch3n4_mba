<<<<<<< HEAD
const authJwt = require("./authjwt");
const validateIdInParams = require("./paramsVerifier");
const validateUserRequestBodies = require("./validateUserRequestBodies");
const validateMovieRequestBodies = require("./validateMovieRequestBodies");
const validateTheatreRequestBodies = require("./validateTheatreRequestBodies");
const verifyBooking = require("./bookingReqBobyValidator");
const validatePayment = require("./validatePaymentBody");

module.exports = {
  authJwt,
  validateIdInParams,
  validateUserRequestBodies,
  validateMovieRequestBodies,
  validateTheatreRequestBodies,
  verifyBooking,
  validatePayment,
};
=======
const authJwt = require('./authjwt')
const validateIdInParams = require('./paramsVerifier')
const validateUserRequestBodies = require('./validateUserRequestBodies')
const validateMovieRequestBodies = require('./validateMovieRequestBodies')
const validateTheatreRequestBodies = require('./validateTheatreRequestBodies')
const validatePaymentRequestBody = require('./validatePaymentRequestBody')
const verifyBooking = require('./bookingReqBobyValidator')

module.exports = {
    authJwt,
    validateIdInParams,
    validateUserRequestBodies,
    validateMovieRequestBodies,
    validateTheatreRequestBodies,
    validatePaymentRequestBody,
    verifyBooking
}
>>>>>>> 30e529642b5ca1e54b019b8ea4ee6e58174a3dcb
