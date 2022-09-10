 const movieController = require('../controllers/movie.controller');
 const {authJwt} = require('../middlewares');
 const {validateMovie} = require('../middlewares');


 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", [authJwt.verifyToken, authJwt.isAdmin, validateMovie.validateMovieReuestBody], movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateMovie.validateMovieId], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateMovie.validateMovieId], movieController.deleteMovie)
     app.get("/mba/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", [authJwt.verifyToken, validateMovie.validateMovieId], movieController.getSingleMovie)
 }