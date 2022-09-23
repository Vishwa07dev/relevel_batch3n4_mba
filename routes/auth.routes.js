const authController = require('../controllers/auth.controller')
const {validateUserRequestBodies} = require('../middlewares')
const {authJwt} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", [validateUserRequestBodies.signUpBody], authController.signup)
    app.post("/mba/api/v1/auth/signin", [validateUserRequestBodies.signInBody], authController.signin)
    
    app.post("/mba/api/v1/auth/refreshtokens/:refreshtoken", [authJwt.verifyRefreshToken], authController.getAccessToken)
}