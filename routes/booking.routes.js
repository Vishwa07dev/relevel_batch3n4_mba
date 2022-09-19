const bookingController = require('../controllers/booking.controller');
const {authJwt, validateBookingRequestBodies, validateIdInParams} = require('../middlewares')
module.exports = (app)=>{

    app.post("/mba/api/v1/booking", [authJwt.verifyToken, validateBookingRequestBodies.createBookingBodyRequest], bookingController.createBooking);

    app.put("/mba/api/v1/booking/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.bookingInParams], bookingController.updateBooking);

    app.get("/mba/api/v1/booking/:id",[authJwt.verifyToken, validateIdInParams.bookingInParams], bookingController.findOneBooking);

    app.get("/mba/api/v1/bookings",[authJwt.verifyToken],bookingController.findAllBookings);

}
