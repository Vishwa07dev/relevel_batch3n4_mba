const authJwt = require("./authjwt");
const verifyRequestBodiesForAuth = require("./verify.SignUp");
const verifyTheatre = require("./theatreValidator");
const verifyMovie = require("./movieValidator");
module.exports = {
  authJwt,
  verifyRequestBodiesForAuth,
  verifyTheatre,
  verifyMovie,
};
