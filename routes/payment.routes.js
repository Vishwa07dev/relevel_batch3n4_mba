const paymentController=require("../controllers/payment.controllers")
const {authJwt}=require("../middlewares")
module.exports=(app)=>{
    
    app.post("/mba/api/v1/payments",[authJwt.verifyToken],paymentController.initPayment);
    
    app.get("/mba/api/v1/payments",paymentController.getAllPayment);

    app.get("/mba/api/v1/payments/:id",[authJwt.verifyToken,authJwt.isAdminOrOwnerOfBooking],paymentController.getPayment);
}