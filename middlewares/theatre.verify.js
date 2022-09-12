const Theatre = require('../models/theatre.model');



const verifyTheatreRequestBody = async (req,res,next) =>{


    const theatre = await findOne({name : req.body.name});
    if(theatre !=null){
        return res.status(400).send({
            message : "Theatre with this name aleardy patent"
        })
    }


    if(!req.body.name){
        return res.status(400).send({
            message : "Name is not provided"
        })
    }

    if(!req.body.description){
        return res.status(400).send({
            message : "Description is not provided"
        })
    }

    if(!req.body.city){
        return res.status(400).send({
            message : "City is not provided"
        })
    }

    if(!req.body.pinCode){
        return res.status(400).send({
            message : "pinCode is not provided"
        })
    }

    if(!req.body.showTypes){
        return res.status(400).send({
            message : "show Type is not provided"
        })
    }

    if(!req.body.numberOfSeats){
        return res.status(400).send({
            message : "Number of seats to be booked not provided"
        })
    }
    next();
}



const verifyTheatreParam = async (req,res,next) =>{



    const theatre = await Theatre.findOne({_id:req.params.id})
    const nameQP = req.query.nameQP
    if(theatre == null && !nameQP){
        return res.status(400).send({
            message: "Theatre is not found" 
        })
    }


    next()
}

const movieInTheatre = async (req,res,next) =>{

    const theatre = await Theatre.findOne({_id : req.params.id})
    if(!theatre.movies.length){
        return res.status(400).send({
            message : "There are no movies in theatre"
        })
    }
    
}

const verifyTheatre = {

    verifyTheatreParam  : verifyTheatreParam,
    verifyTheatreRequestBody : verifyTheatreRequestBody,
    movieInTheatre : movieInTheatre

}
module.exports = verifyTheatre