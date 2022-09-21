const { constants } = require("../utils");


const validatePaymentStatus = async (req, res, next) =>{
    try{
        const booking  = req.bookingInParams;

        if(booking.status == constants.bookingStatuses.completed){
            res.status(400).send({
                message : "booking payment is already completed"
            });
            return;
        }
        if(booking.status == constants.bookingStatuses.cancelled){
            res.status(400).send({
                message : "booking payment cancelled already"
            });
            return;
        }
        if(booking.status == constants.bookingStatuses.failed){
            res.status(400).send({
                message : "booking is failed already"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Some Error while validating payment status", err.message);
        res.status(500).send({
            message : "Some Error while validating payment status"
        })
    }
}

const validatePayment = {
    validatePaymentStatus
}

module.exports = validatePayment;