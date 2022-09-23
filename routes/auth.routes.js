const authController = require('../controllers/auth.controller')
const {validateUserRequestBodies, validateIdInParams} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", [validateUserRequestBodies.signUpBody], authController.signup)
    app.post("/mba/api/v1/auth/signin", [validateUserRequestBodies.signInBody], authController.signin)

    app.get("/mba/api/v1/refreshTokens/:refreshToken", [validateIdInParams.verifyRefreshToken], authController.refreshAccessToken)
}