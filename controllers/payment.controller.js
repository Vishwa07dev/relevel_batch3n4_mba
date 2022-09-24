const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const mailConfig = require("../configs/mail.config");
const confimationSender = require("../utils/nodeMailer");
const serverConfig = require("../configs/server.config");

exports.getAllPayments = async (req, res) => {
  try {
    let queryObj = {};

    if (req.user.userType != constants.userTypes.admin) {
      queryObj._id = req.user.myPayments;
    }

    const payments = await Payment.find(queryObj);

    res.status(200).send(payments);
  } catch {
    console.log("Error while getting given all payment records", err.message);

    return res.status(500).send({
      message: "Some internal error",
    });
  }
};

exports.getOnePayment = async (req, res) => {
  res.status(200).send(req.paymentInParams);
};

exports.createPayment = async (req, res) => {
  try {
    const paymentObj = {
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      status: req.body.status,
    };

    var payment = await Payment.create(paymentObj);

    req.booking.status =
      payment.status == constants.paymentStatuses.success
        ? constants.bookingStatuses.completed
        : constants.bookingStatuses.failed;
    await req.booking.save();

    req.user.myPayments.push(payment._id);
    await req.user.save();
    confimationSender(
      "Payment successful for mba",
      req.user.email,
      $`The payment was successfull the booking details are ${payment}`,
      mailConfig.companyEmail
    );

    res.status(201).send(payment);
  } catch (err) {
    const paymentErr =
      payment.status == constants.bookingStatuses.cancelled
        ? "Your Session timed out"
        : "You cancelled the request mid-way";
    console.log("Error while creating the payment", err.message);
    confimationSender(
      "payment failed",
      req.user.email,
      `payment unsuccessful for mba because  ${paymentErr}... please retry again on this link : "http://localhost:${serverConfig.PORT}/mba/api/v1/payments"`,
      mailConfig.companyEmail
    );
    return res.status(500).send({
      message: "Some internal error",
    });
  }
};
