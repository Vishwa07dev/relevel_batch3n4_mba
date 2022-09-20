const Payment=require("../models/payment.models")
const Booking=require("../models/booking.model")
const constants=require("../utils/constants")

exports.initPayment=async (req,res)=>{
    try
    {
        const data={
            bookedId:req.body.bookedId,
            amount:req.body.amount,
            status:req.body.status
        }    
       
        const paymentObj=await Payment.create(data);
       
        const booking=await Booking.findOne({_id:paymentObj.bookedId})
       
        res.status(201).send(paymentObj)

        return setTimeout(async()=>{
            if(paymentObj.status!=constants.paymentStatus.success)
            {
                paymentObj.status=constants.paymentStatus.failed;
                booking.status=constants.bookingStatuses.failed;
            }
            if(paymentObj.status==constants.paymentStatus.success)
            {
                booking.status=constants.bookingStatuses.completed
            }
            await paymentObj.save();
            await booking.save();
        },20000)
    }catch(err)
    {
        console.log("#### error while doing payment ####",err.message);
        res.status(500).send({
            message:"Internal server error while doing payment"
        })
    }
    
}

exports.getPayment=async(req,res)=>{
    try
    {
    
        const  payment=await Payment.findOne({_id:req.params.id})
        res.status(200).send(payment)
    }catch(err)
    {
        console.log("#### Error while getting payment ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting payment"
        })
    }
    
}


exports.getAllPayment=async(req,res)=>{
    try
    {
        const  payment=await Payment.find()
        res.status(200).send(payment)
    }catch(err)
    {
        console.log("#### Error while getting all payment ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting all payment"
        })
    }
    
}