const authController = require('../controllers/auth.controller');
const { verifySignUpAndSignInReqBody } = require('../middlewares');

module.exports = (app) => {
    /**
     * for signUp
     * 
     * Post request
     */
    app.post("/mba/api/v1/auth/signup", [verifySignUpAndSignInReqBody.verifyUserCreationReqBody], authController.signup);

    /**
     * signIn 
     * 
     * Post request
     */
    app.post("/mba/api/v1/auth/signin", [verifySignUpAndSignInReqBody.verifyUserSigninReqBody], authController.signin);
}