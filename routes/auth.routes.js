const authController = require('../controllers/auth.controller')
const {verifySign} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", [verifySign.verifySignUpRequestBody],authController.signup)
    app.post("/mba/api/v1/auth/signin",[verifySign.verifySignInRequestBody] ,authController.signin)
}