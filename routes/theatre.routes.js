const theatreController = require('../controllers/theatre.controller')
const {authJwt, validateIdInParams, validateTheatreRequestBodies} = require('../middlewares')

 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateTheatreRequestBodies.newTheatreBody], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.theatreInParams, authJwt.isValidTheatreOwner, validateTheatreRequestBodies.editTheatreBody], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.theatreInParams, authJwt.isValidTheatreOwner], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken, validateIdInParams.theatreInParams], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, validateIdInParams.theatreInParams], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.theatreInParams, authJwt.isValidTheatreOwner, validateTheatreRequestBodies.editMoviesInTheatreBody], theatreController.editMoviesInTheatre)
}