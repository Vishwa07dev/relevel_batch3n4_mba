const paymentController = require("../controllers/payment.controller")
const { authJwt, validateIdInParams, validatePaymentRequestBody } = require("../middlewares");


module.exports = (app)=>{


    app.post("/mba/api/v1/payments", [authJwt.verifyToken, validatePaymentRequestBody.newPaymentBody],  paymentController.createPayment);

    app.get("/mba/api/v1/payments/:id", [authJwt.verifyToken, validateIdInParams.paymentInParams, authJwt.isAdminOrOwnerOfPayment], paymentController.getOnePayment);

    app.get("/mba/api/v1/payments", [authJwt.verifyToken],  paymentController.getAllPayments);

}