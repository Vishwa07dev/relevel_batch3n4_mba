const bookingController = require("../controllers/booking.controller");

const {
  authJwt,
  validateIdInParams,
  validateBookingRequestBodies,
} = require("../middlewares");

module.exports = (app) => {
  app.get(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken],
    bookingController.getAllBookings
  );
  app.get(
    "/mba/api/v1/bookings/:id",
    [
      authJwt.verifyToken,
      validateIdInParams.bookingInParams,
      validateBookingRequestBodies.validateGetSingleBooking,
    ],
    bookingController.getSingleBooking
  );
  app.put(
    "/mba/api/v1/bookings/:id",
    [
      authJwt.verifyToken,
      validateIdInParams.bookingInParams,
      validateBookingRequestBodies.validateEdit,
    ],
    bookingController.editBooking
  );
  app.post(
    "/mba/api/v1/bookings",
    [
      authJwt.verifyToken,
      validateBookingRequestBodies.validateMovieId,
      validateBookingRequestBodies.validateTheatreId,
      validateBookingRequestBodies.validateCreateBooking,
    ],
    bookingController.createBooking
  );
};
