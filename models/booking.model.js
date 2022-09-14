const mongoose = require("mongoose");
const constants = require("../utils/constants");

const bookingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [
        constants.bookingStatus.canceled,
        constants.bookingStatus.completed,
        constants.bookingStatus.failed,
        constants.bookingStatus.in_progress,
      ],
    },
    totalCost: {
      type: Number,
      required: true,
    },
    timing: {
      type: Date,

      required: true,
    },
    movieId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Movie",
      required: true,
    },

    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    theatreId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Theatre",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Booking", bookingSchema);
