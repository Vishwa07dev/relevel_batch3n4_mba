 const movieController = require('../controllers/movie.controller');
 const {authJwt, movieValidator} = require('../middlewares')

 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", [authJwt.verifyToken, authJwt.isAdmin, movieValidator.validMovieRequestBody], movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin], movieController.deleteMovie)
     app.get("/mba/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", [authJwt.verifyToken], movieController.getSingleMovie)
 }