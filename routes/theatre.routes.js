const theatreController = require('../controllers/theatre.controller')
const {authJwt} = require('../middlewares')
const {validateTheatre} = require('../middlewares');

 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateTheatre.validateTheatreRequestBody], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, validateTheatre.validateTheatreId ,authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner ], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, validateTheatre.validateTheatreId ,authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken, validateTheatre.validateTheatreId ], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, validateTheatre.validateTheatreId], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, validateTheatre.validateTheatreId,authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editMoviesInTheatre)
}