const movieControllers=require("../controllers/movie.controller")
module.exports=(app)=>{
    app.post("/mbs/api/v1/movies",movieControllers.movieCreated);
    
    app.put("/mbs/api/v1/movies/:id",movieControllers.movieUpdate);

    app.get("/mbs/api/v1/movies",movieControllers.getAllMovies);
    
    app.get("/mbs/api/v1/movies/:id",movieControllers.getMovie);
   
    app.delete("/mbs/api/v1/movies/:id",movieControllers.deleteMovie)
}
/**
 * Create routes for following APIs
 * 
 * POST :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */