const bookingController = require('../controllers/booking.controller');
const {authJwt, validateIdInParams, validateBookingRequestBodies} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, validateBookingRequestBodies.validateBody], bookingController.createBooking);

    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, validateBookingRequestBodies.validateBodyWhileUpdate, authJwt.isValidBookingOwnwerOrAdmin], bookingController.updateBooking);

    app.get("/mba/api/v1/bookings", [authJwt.verifyToken], bookingController.getAllBooking);

    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, authJwt.isValidBookingOwnwerOrAdmin], bookingController.getBookingById);

}  