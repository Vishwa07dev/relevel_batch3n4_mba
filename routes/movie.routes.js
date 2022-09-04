const movieController = require("../controllers/movie.controller");
const {movieMiddleware} = require("../middlewares/index");

module.exports = (app) => {
    // need to authentication middleware to all the routes
    app.post("/mba/api/v1/movies",[movieMiddleware.isValidReleaseStatus, movieMiddleware.isValidGenre], movieController.createMovie);
    app.get("/mba/api/v1/movies", movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id", [movieMiddleware.isValidParamsId, movieMiddleware.isDeleted], movieController.getMovieById);
    app.put("/mba/api/v1/movies/:id", [movieMiddleware.isValidParamsId, movieMiddleware.isDeleted, movieMiddleware.isValidReleaseStatus, movieMiddleware.isValidGenre], movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id", [movieMiddleware.isValidParamsId, movieMiddleware.isDeleted], movieController.deleteMovie);
}