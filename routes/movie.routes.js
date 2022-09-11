const movieController = require('../controllers/movie.controller');
const { authJwt, movieValidator, pathParamValidator } = require('../middlewares')

module.exports = (app) => {
    app.post(
        "/mba/api/v1/movies",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            movieValidator.validateMovieRequest
        ],
        movieController.createNewMovie
    );
    app.put(
        "/mba/api/v1/movies/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            pathParamValidator.validateMovieId,
            movieValidator.validateMovieRequest,
        ],
        movieController.editMovie
    )
    app.delete(
        "/mba/api/v1/movies/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            pathParamValidator.validateMovieId,
        ],
        movieController.deleteMovie
    )
    app.get(
        "/mba/api/v1/movies",
        [authJwt.verifyToken],
        movieController.getAllMovies
    )
    app.get(
        "/mba/api/v1/movies/:id",
        [
            authJwt.verifyToken,
            pathParamValidator.validateMovieId,
        ],
        movieController.getSingleMovie
    )
}