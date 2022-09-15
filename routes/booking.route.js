const bookingController = require('../controllers/booking.controller');
const {authJwt, bookingReqBodyValidator} = require('../middlewares')

module.exports = (app)=>{
    
    app.post("/mba/api/v1/bookings", 
            [authJwt.verifyToken, bookingReqBodyValidator.bookingReqValidator], 
            bookingController.createBooking
        );

    app.get("/mba/api/v1/bookings", 
            [authJwt.verifyToken], 
            bookingController.getAllBookings
        );
    
    app.get("/mba/api/v1/bookings/:id", 
            [authJwt.verifyToken], 
            bookingController.getBookingById
        );

   app.put("/mba/api/v1/bookings/:id", 
        [authJwt.verifyToken], 
        bookingController.updateBooking
    );

    app.delete("/mba/api/v1/bookings/:id", 
            [ authJwt.verifyToken, authJwt.isAdmin ], 
            bookingController.deleteBooking)
}