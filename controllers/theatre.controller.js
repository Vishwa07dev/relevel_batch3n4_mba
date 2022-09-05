const Theatre=require("../models/theatre.model")

exports.createTheatre=async(req,res)=>{
    const theatreBody=req.body;
    const theatreObj={
        name:theatreBody.name,
        description:theatreBody.description,
        city:theatreBody.city,
        pinCode:theatreBody.pinCode,
        showTypes:theatreBody.showTypes,
        numberOfSeats:theatreBody.numberOfSeats
    }
    try
    {
        const newTheatre=await Theatre.create(theatreObj);
        res.status(201).send(newTheatre)
    }catch(err)
    {
        console.log("Error whilel Creating Theatre",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.updateRecord=async (req,res)=>{
    try{
        const theatreBody=req.body;

        const theatre=await Theatre.find({_id:req.params.id});
        
        theatre.name=theatreBody.name!=undefined?theatreBody.name:theatre.name;
        theatre.description=theatreBody.description!=undefined?theatreBody.description:theatre.description;
        theatre.city=theatreBody.city!=undefined?theatreBody.city:theatre.city;
        theatre.pinCode=theatreBody.pinCode!=undefined?theatreBody.pinCode:theatre.pinCode;
        theatre.showTypes=theatreBody.showTypes!=undefined?theatreBody.showTypes:theatre.showTypes;
        theatre.numberOfSeats=theatreBody.numberOfSeats!=undefined?theatreBody.numberOfSeats:theatre.numberOfSeats;
    
        const theatreObj=await theatre.save();
        res.status(200).send(theatreObj)
    }catch(err)
    {
        console.log("Error While Updating Theather",err.message);
        res.status(500).send({
            message:"Internal Server Error.."
        })
    }
    
}

exports.getTheather=async (req,res)=>{
    try
    {
        const theatre=await Theatre.findOne({_id:req.params.id});
        if(theatre==null)
        {
            res.status(400).send({
                message:"Theatre Doesn't Exist!!!"
            })
        }
        res.status(200).send(theatre)
    }catch(err){
        console.log("Errror while finding theather",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
    
}

exports.getAllTheather=async (req,res)=>{
    try
    {
        const theatre=await Theatre.find();
        res.status(200).send(theatre)
    }catch(err){
        console.log("Errror while finding theather",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
    
}

exports.deleteTheather=async(req,res)=>{
    try
    {
        const theather=await Theatre.findOne({_id:req.params.id});
        await theather.remove();
    
        res.status.send({
            message:"Succesfully Deleted..."
        })
    }catch(err)
    {
        res.status(500).send({
            message:"Internal server error while Deleting "
        })
    }
    
}