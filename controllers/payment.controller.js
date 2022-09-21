const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");

exports.intializePayment = async (req, res) => {
  try {
    const data = {
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      paymentStatus: req.body.paymentStatus.completed,
    };
    const payment = await Payment.create(data);

    req.user.myPayments.push(payment._id);
    req.user.save();

    res.status(201).send(payment);
  } catch (err) {
    console.log("#### Error while updating theatre data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating theatre data",
    });
  }
};

exports.getAllPayment = async (req, res) => {
  try {
    let payments = [];
    if (req.user.userType != constants.userTypes.admin) {
      payments = await Payment.find();
    } else {
      payments = req.user.myPayments;
    }

    res.status(200).send(payments);
  } catch (err) {
    console.log("#### Error while updating theatre data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating theatre data",
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
    });

    res.status(200).send(payment);
  } catch (err) {
    console.log("#### Error while updating theatre data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating theatre data",
    });
  }
};