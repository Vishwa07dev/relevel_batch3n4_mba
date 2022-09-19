const Payment = require("../models/payment.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const constant = require("../utils/constants");
const statusCreators = require("../utils/statusCreator");
const myPayment = require("../utils/paymentDetails");
const constants = require("../utils/constants");
// const { theatreInParams } = require("../middlewares/paramsVerifier");
exports.createPayment = async (req, res) => {
  const randomStatus = await statusCreators.statusCreate();
  if (randomStatus.status != constant.paymentStatuses.completed) {
    req.booking.status = constant.bookingStatuses.failed;
    return res
      .status(400)
      .send("Your session has timed out....please try again later");
  }

  const newObj = {
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    status: randomStatus,
  };

  try {
    const payment = await Payment.create(newObj);
    req.booking.myPayment.push(payment._id);
    await req.booking.save();

    const movie = await Movie.findOne({ _id: req.booking.movieId });
    const theatre = await Theatre.findOne({ _id: req.booking.theatreId });
    return res.status(201).send({
      Movie: movie.name,
      Theatre: theatre.name,
      showTiming: req.booking.ticketBookedTime,
      totalAmount: payment.amount,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

exports.getSingleUserPayment = async (req, res) => {
  try {
    const payments = req.selectUser.myPayment;
    const getPaymentDetails = await myPayment.paymentDetail(payments);
    if (getPaymentDetails == false) {
      console.log(err);
      return res.status(500).send("err occured");
    } else {
      return res.status(200).send(getPaymentDetails);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("err occured");
  }
};

exports.getAllPayment = async (req, res) => {
  if (req.user == constants.userTypes.admin) {
    try {
      const payments = await Payment.find();
      const getPaymentDetails = await myPayment.paymentDetail(payments);
      if (getPaymentDetails == false) {
        console.log(err);
        return res.status(500).send("err occured");
      } else {
        return res.status(200).send(getPaymentDetails);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("err occured");
    }
  } else {
    try {
      const payments = req.user.payments;
      const getPaymentDetails = await myPayment.paymentDetail(payments);
      if (getPaymentDetails == false) {
        console.log(err);
        return res.status(500).send("err occured");
      } else {
        return res.status(200).send(getPaymentDetails);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("err occured");
    }
  }
};
