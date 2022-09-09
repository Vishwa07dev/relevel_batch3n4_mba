const theatreController = require('../controllers/theatre.controller');
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", theatreController.createTheatre);
    app.put("/mba/api/v1/theatres/:id", theatreController.editTheatre);
    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre);
    app.get("/mba/api/v1/theatres/:id/movies", theatreController.getAllMoviesInTheatre);
    app.put("/mba/api/v1/theatres/:id/movies", theatreController.updateMoviesInTheatre);
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