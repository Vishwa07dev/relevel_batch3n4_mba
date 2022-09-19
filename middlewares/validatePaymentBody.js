const { default: mongoose } = require("mongoose");
const Booking = require("../models/booking.model");
const constants = require("../utils/constants");

exports.validateCreatePayment = async (req, res, next) => {
  // bookingId: req.body.bookingId,
  if (!req.booking.Id) {
    return res.status(400).send("You've to provide a valid bookingId");
  }
  if (mongoose.isValidObjectId(req.bookingId)) {
    return res
      .status(400)
      .send("You've to provide a valid bookingId this 1 is invalid");
  }
  let booking;
  try {
    booking = await Booking.findOne({ _id: req.body.bookingId });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("internal server error please try again later....!");
  }
  if (!booking) {
    return res
      .status(400)
      .send("You've to provide a valid bookingId this one is invalid");
  }
  if (booking.status != constants.bookingStatuses.inProgress) {
    return res
      .status(400)
      .send(
        `THIS BOOKING IS ALREADY ${booking.status} hence you are not allowed to make any changes`
      );
  }
  // amount: req.body.amount,
  if (!req.body.amount && req.body.amount != booking.totalCost) {
    return res
      .status(400)
      .send("The amount sent does not match the required cost");
  }
  req.booking = booking;
  next();
};

exports.validateSingleUserPayment = async (req, res, next) => {
  if (req.user.userType == constants.userTypes.admin) {
    if (!req.params.id) {
      return res.status(400).send("You've to provide a valid userId");
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("You've to provide a valid userId");
    }
    try {
      req.validUser = await User.findOne({ _id: req.params.id });
    } catch (err) {
      console.log(err);
      return res.status(500).send("internal server err");
    }
    if (!req.validUser) {
      return res
        .status(400)
        .send("You've to provide a valid userId this one is invalid");
    }
    req.selectUser = req.validUser;
    next();
  } else {
    req.selectUser = req.user;
    next();
  }
};

;
  