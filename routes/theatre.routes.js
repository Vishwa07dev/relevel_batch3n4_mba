const theatreController = require('../controllers/theatre.controller');
const { authJwt } = require('../middlewares');

module.exports = (app)=>{
    app.post(
        "/mba/api/v1/theatres", 
        [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin], 
        theatreController.createNewTheatre
    );
    app.put(
        "/mba/api/v1/theatres/:id", 
        [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin], 
        theatreController.editTheatre
    )
    app.delete(
        "/mba/api/v1/theatres/:id", 
        [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin], 
        theatreController.deleteTheatre
    )

    // USER's can able to see the theatres list(signedin r withoutsignedin)
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre)

    // USER's can able to see the movie list(signedin r withoutsignedin)
    app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMoviesInTheatre)
    
    app.put(
        "/mba/api/v1/theatres/:id/movies", 
        [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin], 
        theatreController.editMoviesInTheatre
    )
}