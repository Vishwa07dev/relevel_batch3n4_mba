const bookingController=require("../controllers/booking.controller");

const {validateBookingRequestBody,authJwt,validateIdInParams}=require("../middlewares")

module.exports=(app)=>{
    app.post("/mba/api/v1/bookings",[authJwt.verifyToken,validateBookingRequestBody.bookingValidation],bookingController.createBooking);

    app.put("/mba/api/v1/bookings/:id",[authJwt.verifyToken,validateIdInParams.bookingInParams,validateBookingRequestBody.editBookingStatus],bookingController.updateBooking);

    app.get("/mba/api/v1/bookings",[authJwt.verifyToken],bookingController.getBooking);

    app.get("/mba/api/v1/bookings/:id",[authJwt.verifyToken,validateIdInParams.bookingInParams,authJwt.isAdminOrOwner],bookingController.getAllBooking);
}