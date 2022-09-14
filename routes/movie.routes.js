 const movieController = require('../controllers/movie.controller');
 const {authJwt, paramsValidator, validaionsOfMovieReqBody} = require('../middlewares')

 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", [authJwt.verifyToken, authJwt.isAdmin, validaionsOfMovieReqBody.validateMovieBody], movieController.createNewMovie);

     app.put("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, paramsValidator.movieParams], movieController.editMovie)

     app.delete("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, paramsValidator.movieParams], movieController.deleteMovie)

     app.get("/mba/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies)
     
     app.get("/mba/api/v1/movies/:id", [authJwt.verifyToken, paramsValidator.movieParams], movieController.getSingleMovie)
 }