const { validatePayment, authJwt } = require("../middlewares");
const paymentController = require("../controllers/payment.controller");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/payments",
    [authJwt.verifyToken, validatePayment.validateCreatePayment],
    paymentController.createPayment
  );
  app.get(
    "/mba/api/v1/payments/:id",
    [
      authJwt.verifyToken,
      authJwt.isAdminOrOwner,
      validatePayment.validateSingleUserPayment,
    ],
    paymentController.getSingleUserPayment
  );
  app.get(
    "/mba/api/v1/payments",
    [authJwt.verifyToken, authJwt.isAdminOrOwner],
    paymentController.getAllPayment
  );
};
