/**
 * Create routes for following APIs
 * 
 * POST :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */

 const movieController = require("../controllers/movie.controller");

 module.exports = (app)  =>{
 
     // CREATE CALL
     app.post("/mbs/api/v1/movies",movieController.addMovie);
 
     // GET ALL MOVIES
     app.get("/mbs/api/v1/movies",movieController.getAllMovies);
 
     //GET SINGLE MOVIE
     app.get("/mbs/api/v1/movies/:id",movieController.getOneMovie);
 
     //UPDATE MOVIE
     app.put("/mbs/api/v1/movies/:id",movieController.updateMovie);
 
     //DELETE MOVIE
     app.delete("/mbs/api/v1/movies/:id",movieController.delete)
 
 }