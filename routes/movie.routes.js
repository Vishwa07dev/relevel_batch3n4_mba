 const movieController = require('../controllers/movie.controller');
 const {authJwt} = require('../middlewares');
 module.exports = (app)=>{
     app.post("/mba/api/v1/movies",[ authJwt.verifyToken, authJwt.isTheatreOwner],movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id",[ authJwt.verifyToken, authJwt.isTheatreOwner], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id",[ authJwt.verifyToken, authJwt.isTheatreOwner] ,movieController.deleteMovie)
     app.get("/mba/api/v1/movies", movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", movieController.getSingleMovie)
 }