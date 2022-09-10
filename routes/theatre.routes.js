const theatreController = require('../controllers/theatre.controller');
 const {authJwt} = require('../middlewares')
 
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isAdminOrTheatreOwner] ,theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdminOrTheatreCreater],theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdminOrTheatreCreater],theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken],theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken],theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isAdminOrTheatreCreater],theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isAdminOrTheatreCreater],theatreController.editMoviesInTheatre)
}