const bookingController = require("../controllers/booking.controller");

const {
  authJwt,
  validateIdInParams,
  validateBookingRequestBodies,
} = require("../middlewares");

module.exports = (app) => {
  app.get(
    "/mba/api/v1/bookings",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookingController.getAllBookings
  );
  app.get(
    "/mba/api/v1/bookings/:id",
    [
      authJwt.verifyToken,
      authJwt.isTheatreOwnerOrAdmin,
      validateIdInParams.bookingInParams,
    ],
    bookingController.getSingleBooking
  );
  app.put("/mba/api/v1/bookings/:id", [
    authJwt.verifyToken,
    authJwt.isAdminOrOwner,
    validateIdInParams.bookingInParams,
  ]);
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
