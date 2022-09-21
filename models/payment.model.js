const constants = require("../utils/constants");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Booking",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [constants.paymentStatus.completed, constants.paymentStatus.failed],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Payment", paymentSchema);