const mongoose = require("mongoose");
const constants = require("../utils/constants");

const paymentSchema = mongoose.Schema(
  {
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Bookings",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: constants.paymentStatuses.completed,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Payments", paymentSchema);
