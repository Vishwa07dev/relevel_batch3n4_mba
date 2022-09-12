const authController = require('../controllers/auth.controller');
const { validaionsOfUserReqBody } = require('../middlewares');

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup",[validaionsOfUserReqBody.signUpBody], authController.signup);
    app.post("/mba/api/v1/auth/signin",[validaionsOfUserReqBody.signInBody], authController.signin);
}