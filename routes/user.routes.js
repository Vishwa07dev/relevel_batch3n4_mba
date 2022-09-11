const userController = require('../controllers/user.controller')
const { authJwt, queryParamValidator, pathParamValidator } = require('../middlewares')

module.exports = (app) => {
    app.get(
        "/mba/api/v1/users",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
            queryParamValidator.validateUserType,
            queryParamValidator.validateUserStatus
        ],
        userController.findAll
    )
    app.get(
        "/mba/api/v1/users/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdminOrOwner,
            pathParamValidator.validateUserId
        ],
        userController.findByUserId
    )
    app.put(
        "/mba/api/v1/users/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdminOrOwner,
            pathParamValidator.validateUserId
        ],
        userController.updateUser
    )
}