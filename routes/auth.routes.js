const authController = require("../controllers/auth.controller");
const { verifyRequestBodiesForAuth } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/auth/signup",
    [verifyRequestBodiesForAuth.validateSignUpRequestBody],
    authController.signup
  );
  app.post(
    "/mba/api/v1/auth/signin",
    [verifyRequestBodiesForAuth.validateSignInRequestBody],
    authController.signin
  );
};
