const theatreController = require('../controllers/theatre.controller');
 
 module.exports = (app)=>{
     app.post("/mbs/api/v1/theatres", theatreController.createTheatre);
     app.put("/mbs/api/v1/theatres/:id", theatreController.updateTheatre)
     app.get("/mbs/api/v1/theatres", theatreController.getTheatreById)
     app.get("/mbs/api/v1/theatres/:id", theatreController.getAllTheatre)
     app.delete("/mbs/api/v1/theatres/:id", theatreController.deleteTheatre)
 }