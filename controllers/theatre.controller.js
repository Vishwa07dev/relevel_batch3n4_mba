const Theatre=require("../models/theatre.model")
const constants=require("../Utils/theatre.utils")

exports.create=async(req,res)=>{
    try{
        const theatreobj={
            name:req.body.name,
            description:req.body.description,
            city:req.body.city,
            pinCode:req.body.pinCode,
            showTypes:req.body.showTypes,
            numberOfSeats:req.body.numberOfSeats
        }
        const theatre=await Theatre.create(theatreobj)
        res.status(201).send(theatre)
    }
    catch(err){
        console.log("Controller/theatre/create",err)
        res.status(500).send("There was an error from our side")
    }
}