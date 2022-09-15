const bookingController = require('../controllers/booking.controller');
const {authJwt, validateIdInParams, validateBookingRequestBodies} = require('../middlewares')

module.exports = (app)=>{
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, authJwt.isCustomerOrAdmin, validateBookingRequestBodies.newBookingBody], bookingController.createNewBooking);
    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, authJwt.isCustomerOrAdmin, validateIdInParams.bookingInParams, authJwt.isValidCustomer, validateBookingRequestBodies.editBookingBody], bookingController.editBooking)
    app.get("/mba/api/v1/bookings", [authJwt.verifyToken, authJwt.isCustomerOrAdmin], bookingController.getAllBookings)
    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, authJwt.isCustomerOrAdmin, validateIdInParams.bookingInParams, authJwt.isValidCustomer], bookingController.getSingleBooking)
}