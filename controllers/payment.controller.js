const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const User = require('../models/user.model');


exports.createNewPayment = async (req, res) => {
  try {
    const user = await User.findOne({_id : req.user._id});
    const paymentObj = {
        bookingId : req.body.bookingId,
        userId : req.user._id,
        amount : req.body.amount
    }
    const payment = await Payment.create(paymentObj)
    user.payments.push(payment._id);
    await user.save()

    res.status(201).send(payment);
  } catch (err) {
    console.log("Error while creating new payment", err);
    res.status(500).send({
      message: "Internal server error while creating new payment",
    });
  }
};

exports.findAllPayment = async (req, res) => {
    try {
        const queryObj = {}
        if(req.user.userType != constants.userTypes.admin){
            queryObj.userId = req.user._id
        }
      const payments = await Payment.find(queryObj)

      console.log(payments)
  
      res.status(200).send(payments);
    } catch (err) {
      console.log("Error while finding all payment", err);
      res.status(500).send({
        message: "Internal server error while finding all payments",
      });
    }
  };

  exports.findPaymetById = async (req, res) => {
    try {

      const payment = await Payment.findOne({_id : req.params.id})
  
      res.status(200).send(payment);
    } catch (err) {
      console.log("Error in findPayemetById", err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  };
