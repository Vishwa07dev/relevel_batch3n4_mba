const PaymentService = require('../controllers/payment.controller')
const {authJwt,validateIdInParams, validatePayment} = require('../middlewares');
module.exports = (app) =>{

    app.post('/mba/api/v1/booking/:id/payments',[authJwt.verifyToken, validateIdInParams.bookingInParams, validatePayment.validatePaymentStatus], PaymentService.createPayment);

    app.get('/mba/api/v1/payments/:id',[authJwt.verifyToken, validateIdInParams.paymentInParams, authJwt.isAdminOrOwnerOfPayment], PaymentService.singlePaymentReciept);

    app.get('/mba/api/v1/payments',[authJwt.verifyToken, authJwt.isAdminOrOwnerOfPayment], PaymentService.allPaymentReciept);


}