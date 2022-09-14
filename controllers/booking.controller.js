const constants = require("../utils/constants");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");

exports.createNewBooking = async (req, res) => {
  try {
    const data = {
      totalCost: req.body.totalCost,
      status: constants.bookingStatus.in_progress,
      timing: req.body.timing,
      movieId: req.body.movieId,
      userId: req.body.userId,
      theatreId: req.body.theatreId,
    };

    const booking = await Booking.create(data);

    console.log(`#### New booking '${booking._id}' created ####`);
    res.status(201).send(booking);
  } catch (err) {
    console.log("#### Error while creating new booking #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new theatre",
    });
  }
};

exports.editBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });

    (booking.totalCost = req.body.totalCost
      ? req.body.totalCost
      : booking.totalCost),
      (booking.status = req.body.status ? req.body.status : booking.status),
      (booking.timing = req.body.timing ? req.body.timing : booking.timing),
      (booking.movieId = req.body.movieId ? req.body.movieId : booking.movieId),
      (booking.userId = req.body.userId ? req.body.userId : booking.userId),
      (booking.theatreId = req.body.theatreId
        ? req.body.theatreId
        : booking.theatreId);

    const updatedBooking = await booking.save();

    console.log(`#### Booking '${updatedBooking._id}' data updated ####`);
    res.status(200).send(updatedBooking);
  } catch (err) {
    console.log("#### Error while updating Booking data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating Booking data",
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).send(bookings);
  } catch (err) {
    console.log("#### Error while getting all bookings ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting all bookings",
    });
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });

    res.status(200).send(booking);
  } catch (err) {
    console.log("#### Error while getting the booking ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting the booking",
    });
  }
};
