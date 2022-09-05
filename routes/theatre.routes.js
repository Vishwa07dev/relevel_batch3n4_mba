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
     app.post("/mbs/api/v1/theatres", theatreController.addTheatre);
     app.put("/mbs/api/v1/theatres/:id", theatreController.updateTheater)
     app.delete("/mbs/api/v1/theatres/:id", theatreController.deleteTheatre)
     app.get("/mbs/api/v1/theatres", theatreController.getAllTheatre)
     app.get("/mbs/api/v1/theatres/:id", theatreController.getSinglTheatre)
 }