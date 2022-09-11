const movieController = require("../controllers/movie.controller");
const { authJwt } = require("../middlewares");
const { verifyMovie } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/movies",
    [authJwt.verifyToken, authJwt.isAdmin, verifyMovie.isMovieCreatedValid],
    movieController.createNewMovie
  );
  app.put(
    "/mba/api/v1/movies/:id",
    [authJwt.verifyToken, authJwt.isAdmin, verifyMovie.isValidMovieEdit],
    movieController.editMovie
  );
  app.delete(
    "/mba/api/v1/movies/:id",
    [authJwt.verifyToken, authJwt.isAdmin, verifyMovie.isValidMovieId],
    movieController.deleteMovie
  );
  app.get(
    "/mba/api/v1/movies",
    [authJwt.verifyToken],
    movieController.getAllMovies
  );
  app.get(
    "/mba/api/v1/movies/:id",
    [authJwt.verifyToken, verifyMovie.isValidMovieId],
    movieController.getSingleMovie
  );
};
