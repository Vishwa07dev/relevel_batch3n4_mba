const theatreController=require('../controllers/theatre.controller')
module.exports=(app)=>{
    app.post("/mba/api/v1/theatres ",theatreController.createTheatre)

    app.put("/mba/api/v1/theatres/:id",theatreController.updateRecord);

    app.get("/mba/api/v1/theatres/:id",theatreController.getTheather);

    app.get("/mba/api/v1/theatres",theatreController.getAllTheather);

    app.delete("/mba/api/v1/theatres/:id",theatreController.deleteTheather);
}
