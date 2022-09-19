const paymentController = require("../controllers/payment.controller")
const { authJwt, validateIdInParams, verifyPayment} = require("../middlewares");


module.exports = (app)=>{

    app.get("/mba/api/v1/payments", [authJwt.verifyToken], paymentController.getAllpayments);

    app.get("/mba/api/v1/payments/:id", [authJwt.verifyToken, validateIdInParams.paymentInParams, authJwt.isAdminOrOwnerOfThePayment], paymentController.getOnepayment)

    app.post("/mba/api/v1/payments", [authJwt.verifyToken, verifyPayment.verifyPaymentReqBody, authJwt.isAdminOrOwnerOfBooking],  paymentController.makePayment);

}