const theatreController = require('../controllers/theatre.controller');
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", theatreController.editMoviesInTheatre)
}
