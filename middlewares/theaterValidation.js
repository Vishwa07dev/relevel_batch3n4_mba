const Theater=require("../models/theatre.model");
const constants=require("../utils/constants");

const theatreValid=(req,res,next)=>{
   
    // if(!req.body.ownerId ||req.body.ownerId==" ")
    // {
    //     return res.status(400).send({
    //         message:"Failed!!! ownerId is not provided"
    //     })
    // }

    if(!req.body.name||req.body.name==" ")
    {
        return res.status(400).send({
            message:"Failed!!! name is not provided"
        })
    }

    if(!req.body.description||req.body.description==" ")
    {
        return res.status(400).send({
            message:"Failed!!! description is not provided"
        })
    }

    if(!req.body.city||req.body.city==" ")
    {
        return res.status(400).send({
            message:"Failed!!! city is not provided"
        })
    }

    if(!req.body.pinCode||req.body.pinCode==" ")
    {
        return res.status(400).send({
            message:"Failed!!! pinCode is not provided"
        })
    }

    if(!req.body.showTypes||req.body.showTypes==" ")
    {
        return res.status(400).send({
            message:"Failed!!! showTypes is not provided"
        })
    }

    const show=[constants.theatreShows.evening,constants.theatreShows.morning,constants.theatreShows.night,constants.theatreShows.noon]
    if(!show.includes(req.body.showTypes))
    {
        return res.status(400).send({
            message:"Failed!!! showTypes is not provided"
        })
    }

    if(!req.body.numberOfSeats||req.body.numberOfSeats==" ")
    {
        return res.status(400).send({
            message:"Failed!!! numberOfSeats is not provided"
        })
    }
    
    next();
}

const isValid={
    theatreValid
}

module.exports=isValid