const threatreController = require("../controllers/threatre.controller");
module.exports = function(app) {
    app.post("/mba/api/v1/threatres", threatreController.createthreatre);
    app.put("/mba/api/v1/threatres/:id", threatreController.updatethreatre);
    app.delete("/mba/api/v1/threatres/:id", threatreController.deletethreatre);
    app.get("/mba/api/v1/threatres", threatreController.getAllthreatre);
    app.get("/mba/api/v1/threatres/:id", threatreController.getByIdthreatre);

}
