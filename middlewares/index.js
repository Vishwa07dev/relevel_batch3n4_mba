const authJwt = require('./authjwt');
const verifySign = require("./verifySignUp");
const verifyTheatre = require('./theatre.verify');
const verifyMovie = require('./movie.verify')

module.exports = {
    authJwt,
    verifySign,
    verifyTheatre,
    verifyMovie
}