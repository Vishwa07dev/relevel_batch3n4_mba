const bookingController = require("../controllers/booking.controller")
const { authJwt, validateIdInParams, verifyBooking } = require("../middlewares");


module.exports = (app)=>{


    app.post("/mba/api/v1/bookings", [authJwt.verifyToken, verifyBooking.verifyTheatreAndMovie],  bookingController.initiateBooking);

    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, verifyBooking.isAdminOrOwnerOfBooking], bookingController.getOneBooking);

    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, validateIdInParams.bookingInParams, verifyBooking.verifyTheatreAndMovie, verifyBooking.isAdminOrOwnerOfBooking], bookingController.updateTheBookingDetails);

    app.get("/mba/api/v1/bookings", [authJwt.verifyToken],  bookingController.getAllBookings);

}