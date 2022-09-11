const authJwt = require('./authjwt')
const theatreValid=require("./theaterValidation");
const movieValid=require("./movieValidation");
const userValid=require("./userValidation")
module.exports = {
    authJwt,
    theatreValid,
    movieValid,
    userValid
}