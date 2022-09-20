const paymentController = require("../controllers/payment.controller")
const { authJwt, verifyBookingForPayment, verifyPaymentReqBody, verifyPaymentId } = require("../middlewares");


module.exports = (app)=> {


    app.post("/mba/api/v1/payments", 
            [authJwt.verifyToken, 
            verifyPaymentReqBody,
            verifyBookingForPayment],  
            paymentController.payment
    );

    app.get("/mba/api/v1/payments/:id", 
            [authJwt.verifyToken, verifyPaymentId], 
            paymentController.getPaymentById
    );

    app.get("/mba/api/v1/payments", 
            [authJwt.verifyToken, 
            authJwt.isAdmin],  
            paymentController.getAllPayment
    );

}