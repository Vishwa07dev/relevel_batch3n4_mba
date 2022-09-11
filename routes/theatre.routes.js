const theatreController = require("../controllers/theatre.controller");
const { authJwt } = require("../middlewares");
const { verifyTheatre } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    [
      authJwt.verifyToken,
      authJwt.isTheatreOwnerOrAdmin,
      verifyTheatre.isTheatreCreatedValid,
    ],
    theatreController.createNewTheatre
  );
  app.put(
    "/mba/api/v1/theatres/:id",
    [
      authJwt.verifyToken,
      authJwt.isTheatreOwnerOrAdmin,
      verifyTheatre.isValidTheatreId,
      authJwt.isValidTheatreOwner,
      verifyTheatre.isValidTheatreEdit,
    ],
    theatreController.editTheatre
  );
  app.delete(
    "/mba/api/v1/theatres/:id",
    [
      authJwt.verifyToken,
      authJwt.isTheatreOwnerOrAdmin,
      verifyTheatre.isValidTheatreId,
      authJwt.isValidTheatreOwner,
    ],
    theatreController.deleteTheatre
  );
  app.get(
    "/mba/api/v1/theatres",
    [authJwt.verifyToken],
    theatreController.getAllTheatres
  );
  app.get(
    "/mba/api/v1/theatres/:id",
    [authJwt.verifyToken, verifyTheatre.isValidTheatreId],
    theatreController.getSingleTheatre
  );

  app.get(
    "/mba/api/v1/theatres/:id/movies",
    [
      authJwt.verifyToken,
      verifyTheatre.isValidTheatreId,
      verifyTheatre.havingMovieInTheare,
    ],
    theatreController.getMoviesInTheatre
  );
  app.put(
    "/mba/api/v1/theatres/:id/movies",
    [
      authJwt.verifyToken,
      authJwt.isTheatreOwnerOrAdmin,
      authJwt.isValidTheatreOwner,
      verifyTheatre.isValidTheatreId,
    ],
    theatreController.editMoviesInTheatre
  );
};
