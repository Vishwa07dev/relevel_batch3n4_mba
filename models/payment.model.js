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
      enum: [
        constants.paymentStatuses.completed,
        constants.paymentStatuses.failed,
      ],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Payments", paymentSchema);
