const theatreController = require('../controllers/theatre.controller');
 
module.exports = (app)=>{
    app.post("/mbs/api/v1/theatres", theatreController.newTheatre);
    app.put("/mbs/api/v1/theatres/:id", theatreController.editTheatre)
    app.delete("/mbs/api/v1/theatres/:id", theatreController.deleteTheatre)
    app.get("/mbs/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mbs/api/v1/theatres/:id", theatreController.getSingleTheatre)
    
   app.get("/mbs/api/v1/theatres/:id/movies", theatreController.getAllMovies)
    
    app.put("/mbs/api/v1/theatres/:id/movies", theatreController.updateMovies)

}

/***
 * I want to get the list of all the movies runninig in a theater
 * 
 *    GET /mba/api/v1/theatres/:id/movies
 * 
 * Add/Remove a movie inside a theatre  -- Adding or removing multiple movies at a time
 *    PUT /mba/api/v1/theatres/:id/movies
 * 
 * 
 *  
 */