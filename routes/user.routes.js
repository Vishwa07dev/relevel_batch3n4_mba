const userController = require('../controllers/user.controller')
const {authJwt, paramsValidator} = require('../middlewares')

module.exports = (app)=>{
    app.get("/mba/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll)
    app.get("/mba/api/v1/users/:id", [authJwt.verifyToken, paramsValidator.userParams, authJwt.isAdminOrOwner], userController.findByUserId)
    app.put("/mba/api/v1/users/:id", [authJwt.verifyToken, paramsValidator.userParams, authJwt.isAdminOrOwner], userController.updateUser)
}