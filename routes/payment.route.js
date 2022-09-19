const paymentController = require("../controllers/payment.controller")
const { authJwt, validatePaymentRequestBodies, validateIdInParams } = require("../middlewares");


module.exports = (app)=>{


    app.post("/mba/api/v1/payments", [authJwt.verifyToken, validatePaymentRequestBodies.validatePaymentBody],  paymentController.createNewPayment);

    app.get("/mba/api/v1/payments/:id", [authJwt.verifyToken, validateIdInParams.paymentInParams , authJwt.isAdminOrOwnerOfPayment], paymentController.findPaymetById);

    app.get("/mba/api/v1/payments", [authJwt.verifyToken],  paymentController.findAllPayment);

}