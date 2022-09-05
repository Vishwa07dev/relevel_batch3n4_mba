const mongoose = require("mongoose");

const { showTypes } = require("../utils/constants");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    showTypes: {
      type: [String],
      enum: [
        showTypes.evening,
        showTypes.morning,
        showTypes.night,
        showTypes.noon,
      ],
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Theatre", theatreSchema);
