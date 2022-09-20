const paymentController = require("../controllers/payment.controller");
const {
  authJwt,
  validateIdInParams,
  verifyPayment,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/movies",
    [authJwt.verifyToken, verifyPayment.newPaymentBody],
    paymentController.intializePayment
  );
  app.get(
    "/mba/api/v1/payments",
    [authJwt.verifyToken],
    paymentController.getAllPayment
  );
  app.get(
    "/mba/api/v1/payments/:id",
    [
      authJwt.verifyToken,
      validateIdInParams.paymentInParams,
      authJwt.isAdminOrOwnerOfPayment,
    ],
    paymentController.getPayment
  );
};
