const theatreController = require('../controllers/theatre.controller');
const {verifyToken, isAdminOrOwner} = require('../middlewares/authJwt')
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [verifyToken, isAdminOrOwner ], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [verifyToken, isAdminOrOwner], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [verifyToken, isAdminOrOwner ], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [verifyToken, isAdminOrOwner], theatreController.editMoviesInTheatre)
}