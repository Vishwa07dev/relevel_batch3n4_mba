const movieControllers=require("../controllers/movie.controller")
const {movieValid}=require("../middelwares/index")
module.exports=(app)=>{
    /*
        POST :  /mbs/api/v1/movies
    */
    app.post("/mbs/api/v1/movies",
             [movieValid.movieValidation,movieValid.isvalidMovie],
             movieControllers.movieCreated);
    
    /*
        PUT : /mbs/api/v1/movies/:id
    */
    app.put("/mbs/api/v1/movies/:id",
             [movieValid.ismovieExist],
             movieControllers.movieUpdate);

     /*
        GET : /mbs/api/v1/movies
    */
    app.get("/mbs/api/v1/movies",
             movieControllers.getAllMovies);
    
     /*
        GET : /mbs/api/v1/movies/:id
    */
    app.get("/mbs/api/v1/movies/:id",
             [movieValid.ismovieExist],
             movieControllers.getMovie);
   
     /*
        DELETE : /mbs/api/v1/movies/:id
    */
    app.delete("/mbs/api/v1/movies/:id",
                [movieValid.ismovieExist],
                movieControllers.deleteMovie)
}
