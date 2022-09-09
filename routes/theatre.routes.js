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
    app.post("/mba/api/v1/theatres", theatreController.createNewTheatre);
    app.put("/mba/api/v1/theatres/:id", theatreController.editTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", theatreController.getSingleTheatre);
    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
}
