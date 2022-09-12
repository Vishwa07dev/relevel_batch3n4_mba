const theatreController = require('../controllers/theatre.controller')
const {authJwt,verifyTheatre} = require('../middlewares')

 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin,verifyTheatre.verifyTheatreRequestBody], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner,verifyTheatre.verifyTheatreParam,verifyTheatre.movieInTheatre], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken,verifyTheatre.verifyTheatreParam], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken,verifyTheatre.movieInTheatre], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editMoviesInTheatre)
}