

 const theatreController = require('../controllers/thearte.controller');
 
 module.exports = (app)=>{
     app.post("/mbs/api/v1/theatres", theatreController.NewTheatre);
     app.put("/mbs/api/v1/theatres/:id", theatreController.editTheatre)
     app.delete("/mbs/api/v1/theatres/:id", theatreController.deleteTheatre)
     app.get("/mbs/api/v1/theatres", theatreController.getAllTheatre)
     app.get("/mbs/api/v1/theatres/:id", theatreController.getSingleTheatre)
 }