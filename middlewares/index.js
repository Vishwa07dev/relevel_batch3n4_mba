const authJwt = require('./authjwt');
const validaionsOfMovieReqBody = require('./movieReqBodyValidation');
const validaionsOfTheatreReqBody = require('./theatreReqBodyValidation');
const validaionsOfUserReqBody = require('./userReqBodyValidation');
const paramsValidator = require('./paramsValidation');

module.exports = {
    authJwt,
    validaionsOfMovieReqBody,
    validaionsOfTheatreReqBody,
    validaionsOfUserReqBody,
    paramsValidator
}