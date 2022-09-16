const mongoose=require("mongoose")
const constants=require("../utils/constants")
const bookingStatus=[constants.bookingStatus.in_progress,constants.bookingStatus.completed,constants.bookingStatus.cancelled,constants.bookingStatus.failed]

const bookingValidation=(req,res,next)=>{
    try{

        if(!req.body.totalCost)
        {
            return res.status(400).send({
                message:"Failed!!! totalCost is not Provided"
            });
        }
        else if(req.body.totalCost && typeof req.body.totalCost!=="number")
        {
            return res.status(400).send({
                message:"Failed!!! booking totalCoast are not in correct formate(Number) "
            }) 
        }

        if(!req.body.theatreId)
        {
            return res.status(400).send({
                message:"Failed!!! theatreId is not Provided"
            })
        }

        if(!req.body.movieId)
        {
            return res.status(400).send({
                message:"Failed!!! movieId is not Provided"
            })
        }

   

        if(!req.body.status)
        {
            return res.status(400).send({
                message:"Failed!!! status is not Provided"
            })
        }
        else if(!bookingStatus.includes(req.body.status))
        {
            return res.status(400).send({
                message:"Failed!!! invalid Booking status provided "
            })
        }

        if(!req.body.noOfSeats)
        {
            return res.status(400).send({
                message:"Failed!!! noOfSeats is not Provided"
            })
        }
        else if(req.body.noOfSeats && typeof req.body.noOfSeats!=="number")
        {
            return res.status(400).send({
                message:"Failed!!! Booking noOfSeats are not in correct Formate(Number)"
            });
        }

        next();    
    }catch(err)
    {
        console.log("#### Error while validating new booking request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while  booking body validation"
        });
    }
}

const editBookingStatus=(req,res,next)=>{
    try
    {
        if(req.body.totalCost && typeof req.body.totalCost!=="number")
        {
            return res.status(400).send({
                message:"Failed!!! Booking totalCost are not in correct formate(Number)"
            })
        }

        if(req.body.noOfSeats && typeof req.body.noOfSeats !=="number")
        {
            return res.status(400).send({
                message:"Failed!!! Booking noOfSeats are not in correct Formate(Number) "
            })
        }

        if(req.body.status && !bookingStatus.includes(req.body.status))
        {
            return res.status(400).send({
                message:"Failed!!! Invalid bookingStatus are provided"
            })
        }
        next();
    }catch
    {
        console.log("#### Error while validating edit  booking request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while  edit booking body validation"
        });
    }
}

const validateBookingRequestBody={
    bookingValidation,
    editBookingStatus
}

module.exports=validateBookingRequestBody