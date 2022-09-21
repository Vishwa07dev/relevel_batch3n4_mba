const Payment = require('../models/payment.model');
const { constants } = require('../utils');


exports.createPayment = async (req, res)=>{
    try{
        
        const user = req.user;        

        let paymentObj = {
            bookingId : req.bookingInParams._id,
            amount : req.bookingInParams.totalCost,
            status : constants.paymentStatus.completed
        }

        let payment = await Payment.create(paymentObj);

        booking.status = constants.bookingStatuses.completed;
        user.payments.push(payment._id);
        
        await booking.save();
        await user.save();

        res.status(201).send({
            message : "Payment completed successfully",
            reciept : {
                tranctionId : payment._id,
                amount : payment.amount,
                status : payment.status
            }
        })

    }catch(err){
        console.log(`Error creating payment: ${err.message}`);
        res.status(500).send({
            message : "Some Internal Server Error"
        });
    }
}

exports.singlePaymentReciept = async (req, res)=>{
    try{
        
        
        let payment = req.paymentInParams;

        res.status(200).send(payment)

    }catch(err){
        console.log(`Error fetching single reciept payment: ${err.message}`);
        res.status(500).send({
            message : "Some Internal Server Error"
        });
    }
}

exports.allPaymentReciept = async (req, res)=>{
    try{
        var queryObj = {};
        console.log(req.payments)

        if(req.payments){
            queryObj["_id"] = { $in : req.payments};
        }

        let payments = await Payment.find(queryObj);

        res.status(201).send(payments)

    }catch(err){
        console.log(`Error fetching all reciept payment: ${err.message}`);
        res.status(500).send({
            message : "Some Internal Server Error"
        });
    }
}