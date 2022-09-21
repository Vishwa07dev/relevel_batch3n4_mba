const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Payment = require("../models/payment.model");
const Booking = require("../models/payment.model");
exports.paymentDetail = async (bookings) => {
  let payment = [];
  for (let x = 0; x < bookings.length; x++) {
    try {
      const booking = await Booking.findOne({ _id: bookings[x] });
      const movie = await Movie.findOne({ _id: booking.movieId });
      const theatre = await Theatre.findOne({ _id: booking.theatreId });
      const payment = await Payment.findOne({ _id: booking.myPayment });
      let obj = {
        Movie: movie.name,
        Theatre: theatre.name,
        showTiming: req.booking.ticketBookedTime,
        totalAmount: payment.amount,
      };
      payment.push(obj);
    } catch (err) {
      console.log(err);
      return "false";
    }
  }
  return payment;
};
