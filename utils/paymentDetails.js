const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");

exports.paymentDetail = async (payments) => {
  let payment = [];
  for (let x = 0; x < payments.length; x++) {
    try {
      const booking = await Booking.findOne({ _id: payments[x].bookingId });
      const movie = await Movie.findOne({ _id: booking.movieId });
      const theatre = await Theatre.findOne({ _id: booking.theatreId });
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
