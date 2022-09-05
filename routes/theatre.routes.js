const controller=require("../controllers/theatre.controller")

module.exports=(app)=>{
 // POST /mba/api/v1/theatres
 app.post("/mba/api/v1/theatres",controller.create)
 // PUT /mba/api/v1/theatres/:id
 // GET /mba/api/v1/theatres/:id
 // GET /mba/api/v1/theatres
//DELETE /mba/api/v1/theatres/:id

}

