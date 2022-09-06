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

 const theaterController = require('../controllers/theater.controller');
 
 module.exports = (app)=>{
     
     app.post("/mbs/api/v1/theaters", theaterController.newTheater);

     app.get("/mbs/api/v1/theaters/:id", theaterController.getSingleTheatre)
     
     app.get("/mbs/api/v1/theaters", theaterController.getAllTheatres)
     
     app.put("/mbs/api/v1/theaters/:id", theaterController.updateTheatre)
     
     app.delete("/mbs/api/v1/theaters/:id", theaterController.deleteTheatre)
 }