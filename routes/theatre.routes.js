const theatreController = require('../controllers/theatre.controller')
const {authJwt, paramsValidator, validaionsOfTheatreReqBody} = require('../middlewares')

 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validaionsOfTheatreReqBody.validateTheatreBody], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner, paramsValidator.theatreParams], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner, paramsValidator.theatreParams], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken, paramsValidator.theatreParams], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, paramsValidator.theatreParams], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, paramsValidator.theatreParams, authJwt.isValidTheatreOwner], theatreController.editMoviesInTheatre)
}