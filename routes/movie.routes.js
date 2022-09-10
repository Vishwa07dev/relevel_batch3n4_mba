 const movieController = require('../controllers/movie.controller');
 const {authJwt, validateIdInParams, validateMovieRequestBodies} = require('../middlewares')

 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", [authJwt.verifyToken, authJwt.isAdmin, validateMovieRequestBodies.newMovieBody], movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateIdInParams.movieInParams, validateMovieRequestBodies.editMovieBody], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateIdInParams.movieInParams], movieController.deleteMovie)
     app.get("/mba/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", [authJwt.verifyToken, validateIdInParams.movieInParams], movieController.getSingleMovie)
 }