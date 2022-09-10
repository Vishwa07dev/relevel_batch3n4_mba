const authJwt = require('./authjwt')
const validateAuthRequestBody = require('./validateSignUp');
const validateMovie = require('./validateMovie');
const validateTheatre = require('./validateTheatre')

module.exports = {
    authJwt,
    validateAuthRequestBody,
    validateMovie,
    validateTheatre
}