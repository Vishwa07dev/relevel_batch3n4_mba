const authController = require('../controllers/auth.controller')
const { auth } = require('../middlewares/index')

module.exports = (app) => {
    app.post(
        "/mba/api/v1/auth/signup",
        [auth.validateSignUpRequestBody],
        authController.signup
    )
    app.post(
        "/mba/api/v1/auth/signin",
        [auth.validateSignInRequestBody],
        authController.signin
    )
}