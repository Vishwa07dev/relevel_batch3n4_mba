const authJwt = require('./authjwt')
const verifySignUp = require('./verifySignUp');
const theatreValidator = require('./theatreValidator');
const movieValidator = require('./movieValidator');
module.exports = {
    authJwt,
    verifySignUp,
    theatreValidator,
    movieValidator
}