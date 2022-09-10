const authController = require('../controllers/auth.controller')
const {validateAuthRequestBody} = require('../middlewares');

module.exports = (app)=> {
    app.post("/mba/api/v1/auth/signup", [validateAuthRequestBody.validateSignUpRequestBody],authController.signup);
    app.post("/mba/api/v1/auth/signin", [validateAuthRequestBody.validateSignInRequestBody],authController.signin);
}