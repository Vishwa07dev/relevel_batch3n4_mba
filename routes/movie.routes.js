 const movieController = require('../controllers/movie.controller');
 
 module.exports = (app)=>{
     app.post("/mba/api/v1/movies", movieController.newMovie);
     app.put("/mba/api/v1/movies/:id", movieController.editMovie)
     app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie)
     app.get("/mba/api/v1/movies", movieController.getAllMovies)
     app.get("/mba/api/v1/movies/:id", movieController.getSingleMovie)
 }