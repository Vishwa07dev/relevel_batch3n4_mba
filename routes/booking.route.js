const bookingController = require("../controllers/booking.controller")
const { authJwt, validateIdInParams, verifyBooking } = require("../middlewares");


module.exports = (app)=>{


    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, verifyBooking.validateBookingBody],  bookingController.initiateBooking);

    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, authJwt.isAdminOrOwnerOfBooking], bookingController.getOneBooking);

    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, authJwt.isAdminOrOwnerOfBooking, verifyBooking.validateBookingBody, verifyBooking.validateUpdateBookingReqBody], bookingController.updateTheBookingDetails);

    app.get("/mba/api/v1/bookings", [authJwt.verifyToken],  bookingController.getAllBookings);

}