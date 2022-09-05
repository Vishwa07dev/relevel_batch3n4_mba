<<<<<<< HEAD
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

module.exports = (app) => {
    app.post("/mbs/api/v1/movies", movieController.createMovie);

    app.get("/mbs/api/v1/movies", movieController.getAllMovies);

    app.get("/mbs/api/v1/movies/:id", movieController.getMoviesByMovideId);

    app.put("/mbs/api/v1/movies/:id", movieController.updateMovie);
    
    app.delete("/mbs/api/v1/movies/:id", movieController.deleteMovie);
}
=======
 const movieController = require('../controllers/movie.controller');
 
 module.exports = (app)=>{
     app.post("/mbs/api/v1/movies", movieController.NewMovie);
     app.put("/mbs/api/v1/movies/:id", movieController.editMovie)
     app.delete("/mbs/api/v1/movies/:id", movieController.deleteMovie)
     app.get("/mbs/api/v1/movies", movieController.getAllMovies)
     app.get("/mbs/api/v1/movies/:id", movieController.getSingleMovie)
 }
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83
