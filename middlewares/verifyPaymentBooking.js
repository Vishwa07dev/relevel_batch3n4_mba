const { payment } = require('../controllers/payment.controller')
const Booking = require('../models/booking.model')
const Payment = require('../models/payment.model')

const verifyPaymentReqBody = async (req, res, next) => {
    if(!req.body.bookingId){
        return res.status(404).send({
            message: "Booking Id not provided."
        })
    }
    if(!req.body.amount){
        return res.status(404).send({
            message: "Booking amount not provided."
        })
    }
    next();
}


const verifyBookingForPayment = async (req, res, next) =>{

    const bookingId = req.body.bookingId

    const booking = await Booking.findOne({_id: bookingId})

    if(!booking)
    return res.status(404).send({
        message: "Booking Id not not found"
    })
    
    if(!req.user.myBookings.includes(booking._id)){
        return res.status(404).send({
            message: "Booking Id not releted to request user or User is not admin."
        })
    }else{
        next();
    }
}

const verifyPaymentId = async (req, res, next) => {

    const payment = await Payment.findOne({_id : req.params.id})

    if(!payment) return res.status(404).send("Payment Id not found.")
    if(!req.user.userId && req.user.userTpe == 'admin'
     || !payment.userId == req.user._id){
        return res.status(404).send({
        message: "Payment Id not releted to request user or User is not admin."
        })
    }else {
        next();
    }
}



module.exports = { 
    verifyBookingForPayment,
    verifyPaymentReqBody,
    verifyPaymentId
}