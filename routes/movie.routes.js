 const movieController = require('../controllers/movie.controller');
 const {verifyToken, isAdminOrOwner} = require('../middlewares/authJwt')
 
 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", [verifyToken, isAdminOrOwner], movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id", [verifyToken, isAdminOrOwner], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", [verifyToken, isAdminOrOwner], movieController.deleteMovie)
     app.get("/mba/api/v1/movies", movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", movieController.getSingleMovie)
 }