const theatreController = require('../controllers/theatre.controller');
const { authJwt } = require('../middlewares');
module.exports = (app)=>{
    app.post("/mba/api/v1/theatres",[authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin], theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id",[authJwt.verifyToken,authJwt.isValidObjIdInReqParam, authJwt.isTheatreOwnerOrAdmin], theatreController.editTheatre)
    app.delete("/mba/api/v1/theatres/:id",[authJwt.verifyToken,authJwt.isValidObjIdInReqParam, authJwt.isTheatreOwnerOrAdmin], theatreController.deleteTheatre)
    app.get("/mba/api/v1/theatres",[authJwt.verifyToken], theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id",[authJwt.verifyToken], theatreController.getSingleTheatre)

    app.get("/mba/api/v1/theatres/:id/movies",[authJwt.verifyToken,authJwt.isValidObjIdInReqParam, authJwt.isTheatreOwnerOrAdmin], theatreController.getMoviesInTheatre)
    app.put("/mba/api/v1/theatres/:id/movies",[authJwt.verifyToken,authJwt.isValidObjIdInReqParam, authJwt.isTheatreOwnerOrAdmin], theatreController.editMoviesInTheatre)
}