const movieController = require('../controllers/movie.controller');
const { authJwt } = require('../middlewares');

module.exports = (app) => {
    app.post(
        "/mba/api/v1/movies", 
        [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTheatreOwner], 
        movieController.createNewMovie
    );
    app.put(
        "/mba/api/v1/movies/:id", 
        [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTheatreOwner], 
        movieController.editMovie
    )
    app.delete(
        "/mba/api/v1/movies/:id", 
        [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTheatreOwner], 
        movieController.deleteMovie
    )

    // USER's can able to see the movie list(signedin r withoutsignedin)
    app.get("/mba/api/v1/movies", movieController.getAllMovies)
    app.get("/mba/api/v1/movies/:id", movieController.getSingleMovie)
}