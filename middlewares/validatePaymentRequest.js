const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const constsnts = require('../utils/constants');

const validatePaymentBody = async (req, res, next) => {
    try{

        if(!req.body.bookingId){
            return res.status(400).send({
                message: "Please provide booking id for payment"
            })
        }
        if(!req.body.amount){
            return res.status(400).send({
                message: "Please provide amount for payment"
            })
        }
        if(!constsnts.isValidObjectId(req.body.bookingId)){
            return res.status(400).send({
                message : "provided booking Id is not a valid Object Id"
            })
        }
        const booking = await Booking.findOne({_id : req.body.bookingId});
        if(!booking){
            return res.status(400).send({
                message : "Booking Id is not matched"
            })
        }

        if(booking.status != constsnts.bookingStatuses.inProgress){
            return res.status(400).send({
                message : "provided booking is not available for payment !! "
            })
        }
        next()

    }catch(err){
        console.log("Error while validating payment Body")
        res.status(500).send({
            message : "Internal Server Error!!"
        })
    }
}





const validatePaymentBody1 = (treq, res, next) => {
    try{

    }catch(err){
        console.log("Error while validating payment Body")
        res.status(500).send({
            message : "Internal Server Error!!"
        })
    }
}

const validatePaymentRequestBodies = {
    validatePaymentBody 
}
module.exports = validatePaymentRequestBodies