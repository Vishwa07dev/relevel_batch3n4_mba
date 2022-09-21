const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const Booking = require('../models/booking.model');
 
exports.makePayment = async (req, res) => {

    try {
 
        const paymentObj = {

            bookingId: req.body.bookingId,
            amount: req.body.amount,
            paymentStatus: constants.paymentStatus.success 
        }

        const payment = await Payment.create(paymentObj);

        req.bookingInParams.status = payment.paymentStatus == constants.paymentStatus.success ? constants.bookingStatuses.completed : constants.bookingStatuses.failed;

        await req.bookingInParams.save();

        return res.status(201).send(payment);

    } catch (err) {

        console.log("error while initialing the payment ", err.message);

        return res.status(500).send({
            message: "Some internal error..."
        })
    }
}

exports.getAllpayments = async ( req, res) => {

    try {

        let queryObj = {};

        if(req.user.userType != constants.userTypes.admin){
           queryObj.userId = req.user._id;
           console.log("admin signin")
        }
    
        const bookings = await Booking.find(queryObj);
    
        queryObj.bookingId = bookings;
    
        const payments = await Payment.find(queryObj);
        console.log(payments, "---");
    
        res.status(200).send(payments);
    }catch(err){
        console.log("Error while getting all the payment records", err.message);

        return res.status(500).send({
            message: "Some internal error.."
        })
    }
}


exports.getOnepayment = async (req, res) => {

    try{

        res.status(200).send(paymentInParams);

    }catch(err){
        console.log("Error while getting given one payment record", err.message);

        return res.status(500).send({
            message: "Some internal error"
        })
    }
}