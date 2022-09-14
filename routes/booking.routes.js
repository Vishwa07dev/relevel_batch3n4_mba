const bookingController = require('../controllers/booking.controller');
const {authJwt} = require('../middlewares')
module.exports = (app)=>{

    app.post("/mba/api/v1/booking", [authJwt.verifyToken], bookingController.createBooking);

    app.put("/mba/api/v1/booking/:id", [authJwt.verifyToken], bookingController.updateBooking);

    app.get("/mba/api/v1/booking/:id",[[authJwt.verifyToken]], bookingController.findOneBooking);

    app.get("/mba/api/v1/bookings",[authJwt.verifyToken],bookingController.findAllBookings);

}
