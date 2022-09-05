/**
 *  POST /mba/api/v1/theatres
 * 
 *  PUT /mba/api/v1/theatres/:id
 * 
 *  GET /mba/api/v1/theatres/:id
 * 
 *  GET /mba/api/v1/theatres
 * 
 *  DELETE /mba/api/v1/theatres/:id
*/


const theatreController = require("../controllers/theatre.controller");

module.exports = (app) => {
  app.post("/mba/api/v1/theatres", theatreController.createTheatre);
  app.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);
  app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
  app.get("/mba/api/v1/theatres", theatreController.findAllTheatre);
  app.get("/mba/api/v1/theatres/:id", theatreController.findThreatreById);
};
