const Theatre=require("../models/theatre.model")

exports.newTheather=async(req,res)=>{
    try
    {
        const Body=req.body;
        const theatreObj={
            name:Body.name,
            description:Body.description,
            city:Body.city,
            pinCode:Body.pinCode,
            showTypes:Body.showTypes,
            numberOfSeats:Body.numberOfSeats
        }
            const theather=await Theatre.create(theatreObj);
            console.log(`#### New Theather '${theather.name}' created ####`)
            res.status(201).send(theather)
    }catch(err)
    {
        console.log("#### Error whilel creating new theatre ####",err.message);
        res.status(500).send({
            message:"Internal server error while creating new theather"
        })
    }
}

exports.updateRecord=async (req,res)=>{
    try{
        const Body=req.body;

        const theatre=await Theatre.findOne({_id:req.params.id});
        
        theatre.name=Body.name!=undefined?Body.name:theatre.name;
        theatre.description=Body.description!=undefined?Body.description:theatre.description;
        theatre.city=Body.city!=undefined?Body.city:theatre.city;
        theatre.pinCode=Body.pinCode!=undefined?Body.pinCode:theatre.pinCode;
        theatre.showTypes=Body.showTypes!=undefined?Body.showTypes:theatre.showTypes;
        theatre.numberOfSeats=Body.numberOfSeats!=undefined?Body.numberOfSeats:theatre.numberOfSeats;
    
        const theatreObj=await theatre.save();
        console.log(`#### Theather '${theatreObj.name}' data Updated ####`);
        res.status(200).send(theatreObj)
    }catch(err)
    {
        console.log("#### Error while updating theather data ####",err.message);
        res.status(500).send({
            message:"Internal server error while updating existing theather record"
        })
    }
    
}

exports.getTheather=async (req,res)=>{
    try
    {
        const theatre=await Theatre.findOne({_id:req.params.id});
        if(theatre==null)
        {
            return res.status(400).send({
                message:"Failed!!! Theatre Doesn't Exist "
            })
        }
        res.status(200).send(theatre)
    }catch(err){
        console.log("#### Errror while getting the  theather ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting the theather"
        })
    }
    
}

exports.getAllTheather=async (req,res)=>{
    try
    {
        const theatre=await Theatre.find();
        res.status(200).send(theatre)
    }catch(err){
        console.log("#### Errror while getting all theather ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting all theather "
        })
    }
    
}

exports.deleteTheather=async(req,res)=>{
    try
    {
        const theather=await Theatre.findOne({_id:req.params.id});
        await theather.remove();
        console.log(`#### Theather '${theather.name}'  Deleted ####`)
        res.status(200).send({
            message:`Succesfully  Deleted ${theather.name} `
        })
    }catch(err)
    {
        console.log("#### Errror while deleting theather ####",err.message);
        res.status(500).send({
            message:"Internal server error while deleting theather "
        })
    }
    
}