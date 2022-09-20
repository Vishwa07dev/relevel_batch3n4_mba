const Booking=require("../models/booking.model")
const {constants}=require("../utils")

const validatePaymentBody=async (req,res,next)=>{
    try
    {
        
        if(!req.body.bookedId)
        {
            return res.status(400).send({
                message:"Failed!!! bookedId is not Provided"
            })
        }
       
        if(!req.body.amount)
        {
            return res.status(400).send({
                message:"Failed!!! amount is not Provided"
            })
        }
        if(!req.body.status)
        {
            return res.status(400).send({
                message:"Failed!!! bookedId is not Provided"
            })
        }

        const objStatus=[constants.paymentStatus.failed,constants.paymentStatus.success];
        if(!objStatus.includes(req.body.status))
        {
            return res.status(400).send({
                message:"Failed!!! status provided is not valid"
            })
        }
        if(req.body.status && typeof req.body.status!=="string")
        {
            return res.status(400).send({
                message:"Status provided is not in correct formate(String)"
            })
        }

        if(req.body.amount && typeof req.body.amount !=="number" )
        {
                return res.status(400).send({
                    message:"Amount provided is not in correct formate(Number)"
                })
        }
        let booking=await Booking.findOne({_id:req.body.bookedId})
        if(!booking)
        {
            return res.status(400).send({
                message:"Failed!!! Booking Id Provided does not exist"
            })
        }

        if(req.body.amount>booking.totalCost ||req.body.amount<booking.totalCost)
        {
            return res.status(400).send({
                message:`Please provide correct amount :${booking.totalCost}`
            })
        }


        next();
    }catch(err)
    {

        console.log("Error while validating the payment Req Body", err.message);
        return res.status(500).send({
            message: "Some internal error..." 
        })
    }
}

const verifyPayment={
    validatePaymentBody
}

module.exports=verifyPayment