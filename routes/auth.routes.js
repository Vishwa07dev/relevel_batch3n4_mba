const authController = require('../controllers/auth.controller')
const {authJwt,validateUserRequestBodies} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", [validateUserRequestBodies.signUpBody], authController.signup)
    app.post("/mba/api/v1/auth/signin", [validateUserRequestBodies.signInBody], authController.signin)
    app.post("/mba/api/v1/auth/refreshtoken",authJwt.refreshToken);
}