/**
 * Create routes for following APIs
 * 
 * PSOT :  /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies
 * GET : /mbs/api/v1/movies/:id
 * PUT : /mbs/api/v1/movies/:id
 * DELETE : /mbs/api/v1/movies/:id
 */
const controller=require("../controllers/movie.controller")
module.exports=(app)=>{
    app.post("/mbs/api/v1/movies",controller.create)
    app.put("/mbs/api/v1/movies/:id",controller.update)
    app.delete("/mbs/api/v1/movies/:id",controller.delete)
    app.get("/mbs/api/v1/movies/:id",controller.getMovieById)
    app.get("/mbs/api/v1/movies",controller.getAllMovie)
}