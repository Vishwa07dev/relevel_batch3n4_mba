const theatreController = require('../controllers/theatre.controller');
const {authJwt} = require('../middlewares');
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwner], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwner],theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id",[authJwt.verifyToken, authJwt.isTheatreOwner] ,theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies",[authJwt.verifyToken, authJwt.isTheatreOwner],theatreController.editMoviesInTheatre)
}