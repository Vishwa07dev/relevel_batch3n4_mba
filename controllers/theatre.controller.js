const Theatre=require("../models/theatre.model")
const constants=require("../Utils/constants")

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
exports.update=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})

        theatre.name=req.body.name!==undefined? req.body.name : theatre.name
        theatre.description=req.body.description!==undefined? req.body.description : theatre.description
        theatre.city=req.body.city!==undefined? req.body.city : theatre.city
        theatre.pinCode=req.body.pinCode!==undefined? req.body.pinCode : theatre.pinCode
        theatre.showTypes=req.body.showTypes!==undefined? req.body.showTypes: theatre.showTypes
        theatre.numberOfSeats=req.body.numberOfSeats!==undefined? req.body.numberOfSeats: theatre.numberOfSeats

        await theatre.save()
        res.status(201).send(theatre)
    }
    catch(err){
        console.log("controller/theatre/update",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.getById=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        res.status(200).send(theatre)
    }
    catch(err){
        console.log("controller/theatre/getbyid",err)
        res.status(500).send("There was an error from our side")
    }
}
exports.getAll=async(req,res)=>{
    try{
        const theatre=await Theatre.find()
        res.status(200).send(theatre)
    }
    catch(err){
        console.log("controller/theatre/getbyid",err)
        res.status(500).send("There was an error from our side")
    }
}
exports.delete=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        await theatre.remove()
        res.status(201).send("Deleted")
    }
    catch(err){
        res.status(500).send("There was an error from our side")
    }
}