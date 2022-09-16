const mongoose = require("mongoose");
const { bookingStatus } = require("../utils/constants");

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  theatreId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: [
      bookingStatus.cancelled,
      bookingStatus.completed,
      bookingStatus.failed,
      bookingStatus.inProgress,
    ],
    default: bookingStatus.inProgress,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
  },
  timing: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
