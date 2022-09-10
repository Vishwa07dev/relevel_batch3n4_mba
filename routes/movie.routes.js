 const movieController = require('../controllers/movie.controller');
 const { verifyToken } = require("../middlewares/auth.jwt");
 module.exports = (app)=>{
     app.post("/mba/api/v1/movies",  [verifyToken],movieController.createNewMovie);
     app.put("/mba/api/v1/movies/:id", [verifyToken], movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", [verifyToken], movieController.deleteMovie)
     app.get("/mba/api/v1/movies", [verifyToken], movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", [verifyToken], movieController.getSingleMovie)
 }