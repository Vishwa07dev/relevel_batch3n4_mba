const theatreController = require('../controllers/theatre.controller');
const { verifyToken } = require("../middlewares/auth.jwt");
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [verifyToken],theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [verifyToken],theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [verifyToken],theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [verifyToken],theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [verifyToken],theatreController.getSingleTheatre)
    
    app.get("/mba/api/v1/theatres/:id/movies", [verifyToken],theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies",[verifyToken], theatreController.editMoviesInTheatre)
}