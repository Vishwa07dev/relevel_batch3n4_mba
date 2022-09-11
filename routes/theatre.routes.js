const theatreController = require('../controllers/theatre.controller')
const {authJwt} = require('../middlewares')
const {theatreValid}=require("../middlewares/index")
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken,theatreValid.theatreValid ,authJwt.isTheatreOwnerOrAdmin], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken,theatreValid.theatreValid, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken,theatreValid.theatreValid, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.editMoviesInTheatre)
}