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
    movieController.createNewMovie
  );
  app.get(
    "/mba/api/v1/payments",
    [authJwt.verifyToken],
    movieController.getAllMovies
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
