const paymentController=require("../controllers/payment.controllers")
const {authJwt,validateIdInParams,verifyPayment}=require("../middlewares")
module.exports=(app)=>{
    
    app.post("/mba/api/v1/payments",[authJwt.verifyToken,verifyPayment.validatePaymentBody],paymentController.initPayment);
    
    app.get("/mba/api/v1/payments",[authJwt.verifyToken],paymentController.getAllPayment);

    app.get("/mba/api/v1/payments/:id",[authJwt.verifyToken,validateIdInParams.paymentInParams,authJwt.isAdminOrPaymentOwner],paymentController.getPayment);
}