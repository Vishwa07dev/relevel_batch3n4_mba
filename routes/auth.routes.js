const authController = require('../controllers/auth.controller')
const {verifySignUp} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", verifySignUp.validateSignupRequestBody, authController.signup)
    app.post("/mba/api/v1/auth/signin", verifySignUp.validateSignInRequestBody, authController.signin)
}