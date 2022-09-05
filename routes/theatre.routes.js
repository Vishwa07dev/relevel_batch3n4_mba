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
const controller=require("../controllers/theatre.controller")


module.exports=(app)=>{
    app.post("/mba/api/v1/theatres",controller.create)
    app.put("/mba/api/v1/theatres/:id",controller.update)
    app.get("/mba/api/v1/theatres/:id",controller.getById)
    app.get("/mba/api/v1/theatres",controller.getAll)
    app.delete("/mba/api/v1/theatres/:id",controller.delete)
}