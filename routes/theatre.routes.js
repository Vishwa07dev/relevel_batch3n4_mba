const theatreController = require('../controllers/theatre.controller')
const {authJwt , theatreValidator} = require('../middlewares')

 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, theatreValidator.validateTheatreRequestBody], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreValidator.isValidTheatre, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreValidator.isValidTheatre, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreValidator.isValidTheatre], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, theatreValidator.isValidTheatre], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner, theatreValidator.isValidTheatreList], theatreController.editMoviesInTheatre)
}