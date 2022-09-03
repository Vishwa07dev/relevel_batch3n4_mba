const { isValidMovieIdInReqParam } = require("./validateParamIds");
const {
  validateMovieRequestBody,
  validateMovieUpdateRequestBody,
} = require("./validateBody");

module.exports = {
  validateMovieRequestBody,
  validateMovieUpdateRequestBody,
  isValidMovieIdInReqParam,
};
