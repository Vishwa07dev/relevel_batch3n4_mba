const bookingController = require("../controllers/booking.controller");
const { authJwt, validateBookingRequestBodies } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken, validateBookingRequestBodies.newBookingBody],
    bookingController.createNewBooking
  );
  app.put(
    "/mba/api/v1/bookings/:id",
    [
      authJwt.verifyToken,
      validateBookingRequestBodies.isValidBookingId,
      validateBookingRequestBodies.editBookingBody,
    ],
    bookingController.editBooking
  );
  app.get(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookingController.getAllBookings
  );
  app.get(
    "/mba/api/v1/bookings/:id",
    [authJwt.verifyToken, validateBookingRequestBodies.isValidBookingId],
    bookingController.getSingleBooking
  );
};
