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

const theatreController = require('../controllers/theatre.controller');


module.exports = (app) =>{

    app.post("/mba/api/v1/theatres", theatreController.addTheatre);

    app.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);

    app.get("/mba/api/v1/theatres/:id", theatreController.findById);

    app.get("/mba/api/v1/theatres", theatreController.Theatres);

    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);




}