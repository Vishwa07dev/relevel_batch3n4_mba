const Payment = require('../models/payment.model')

exports.payment = async (req, res) => {

    const paymentObj ={
        bookingId:req.body.bookingId,
        amount: req.body.amount,
    }

    const payment = await Payment.create(paymentObj);
    payment.userId = req.user._id
    await payment.save();
    res.status(201).send(payment)
}

exports.getAllPayment = async (req, res) =>{

    const paymentDetails = await Payment.find();
    
    res.status(200).send(paymentDetails);

}

exports.getPaymentById = async (req, res) => {

    const payment = await Payment.findOne({_id : req.params.id})

    res.status(200).send(payment);

}
