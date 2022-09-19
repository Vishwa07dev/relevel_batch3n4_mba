const Booking = require("../models/booking.model");

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

const newPaymentBody = async (req, res, next) => {
  if (!req.body.bookingId) {
    return res.status(400).send({
      message: "Failed ! Booking Id is not provided",
    });
  } else {
    if (!isValidObjectId(req.body.bookingId)) {
      return res.status(400).send({
        message: "Failed ! Invalid Booking Id provided",
      });
    } else {
      const booking = await Booking.findOne({ _id: req.body.bookingId });
      if (!booking) {
        return res.status(400).send({
          message: "Failed ! Booking  id provided does not exist",
        });
      }
    }
  }

  if (!req.body.amount) {
    return res.status(400).send({
      message: "Failed !  AmoPaymentunt is not provided",
    });
  } else if (typeof req.body.pinCode !== "number") {
    return res.status(400).send({
      message: "Failed ! Payment Amount is not in correct format (Number)",
    });
  }
};

const validatePaymentRequestBodies = {
  newPaymentBody,
};

module.exports = validatePaymentRequestBodies;
