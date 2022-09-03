/**
 * Create routes for following APIs
 *
 * POST :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */

const {
  createMovie,
  findAllMovies,
  findMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");
const {
  isValidMovieIdInReqParam,
  validateMovieRequestBody,
  validateMovieUpdateRequestBody,
} = require("../middlewares");

module.exports = (app) => {
  app.post("/mbs/api/v1/movies", [validateMovieRequestBody], createMovie);
  app.get("/mbs/api/v1/movies", findAllMovies);
  app.get("/mbs/api/v1/movies/:id", [isValidMovieIdInReqParam], findMovieById);
  app.put(
    "/mbs/api/v1/movies/:id",
    [isValidMovieIdInReqParam, validateMovieUpdateRequestBody],
    updateMovie
  );
  app.delete("/mbs/api/v1/movies/:id", [isValidMovieIdInReqParam], deleteMovie);
};
