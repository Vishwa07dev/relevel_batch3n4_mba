/**
 * Create routes for following APIs
 * 
 * PSOT :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */
 const movieController  = require("../controllers/movie.controller");
 const movieValidator = require("../middlewares/movieValidation");
 
module.exports = (app) => {
    app.post(
        "/mba/api/v1/auth/movies", 
        [movieValidator.createMovieValidation],
        movieController.createMovie
    );
    app.get(
        "/mba/api/v1/auth/movies", 
        movieController.getMovies
    );
    app.get(
        "/mba/api/v1/auth/movies/:movieId", 
        movieController.getMovies
    );
    app.put(
        "/mba/api/v1/auth/movies/:movieId",
        [movieValidator.deleteAndUpdateMovieValidation], 
        movieController.updateMovie
    );
    app.delete(
        "/mba/api/v1/auth/movies/:movieId", 
        [movieValidator.deleteAndUpdateMovieValidation],
        movieController.deleteMovie
    );
};