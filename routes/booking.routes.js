const bookingController = require('../controllers/booking.controller');
const {authJwt, validateIdInParams, validateBookingRequestBodies} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, validateBookingRequestBodies.newBookingBody], bookingController.createNewBooking);
    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, authJwt.isValidCustomerOrAdmin, validateBookingRequestBodies.editBookingBody], bookingController.editBooking)
    app.get("/mba/api/v1/bookings", [authJwt.verifyToken], bookingController.getAllBookings)
    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, authJwt.isValidCustomerOrAdmin], bookingController.getSingleBooking)
}