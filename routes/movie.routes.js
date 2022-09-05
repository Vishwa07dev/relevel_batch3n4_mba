
/**
 * Create routes for following APIs
 * 
 * PSOT :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */


 const movieController = require('../controllers/movie.controller');
 
 module.exports = (app)=>{
     app.post("/mbs/api/v1/movies", movieController.NewMovie);
     app.put("/mbs/api/v1/movies/:id", movieController.editMovie)
     app.delete("/mbs/api/v1/movies/:id", movieController.deleteMovie)
     app.get("/mbs/api/v1/movies", movieController.getAllMovies)
     app.get("/mbs/api/v1/movies/:id", movieController.getSingleMovie)
 }

