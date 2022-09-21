const authJwt = require('./authjwt')
const validateIdInParams = require('./paramsVerifier')
const validateUserRequestBodies = require('./validateUserRequestBodies')
const validateMovieRequestBodies = require('./validateMovieRequestBodies')
const validateTheatreRequestBodies = require('./validateTheatreRequestBodies')
const verifyBooking = require('./bookingReqBobyValidator')
const verifyPayment =require("./validatePaymentRequestBodies")
module.exports = {
    authJwt,
    validateIdInParams,
    validateUserRequestBodies,
    validateMovieRequestBodies,
    validateTheatreRequestBodies,
    verifyBooking,
    verifyPayment
    
}