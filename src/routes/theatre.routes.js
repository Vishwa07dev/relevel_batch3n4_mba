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
 
 module.exports = (app)=>{
     app.post("/mbs/api/v1/theatres", theatreController.NewTheatre);
     app.put("/mbs/api/v1/theatres/:id", theatreController.editTheatre)
     app.delete("/mbs/api/v1/theatres/:id", theatreController.deleteTheatre)
     app.get("/mbs/api/v1/theatres", theatreController.getAllTheatres)
     app.get("/mbs/api/v1/theatres/:id", theatreController.getSingleTheatre)
 }