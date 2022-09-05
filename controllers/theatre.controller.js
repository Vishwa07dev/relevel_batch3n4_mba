const Theatre = require('../models/theatre.model');

exports.addTheatre = async (req, res)=>{
    try{
        let theatreObj = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats
        }

        let createdTheatre = await Theatre.create(theatreObj);

        res.status(200).send({
            message : "Successfully Added Theatre ",
            data : createdTheatre
        })

    }catch(err){
        console.log("Some Error while creating the theatre !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        });
    }
} 

exports.updateTheatre = async (req, res)=>{
    try{
        let theatre = await Theatre.findOne({_id : req.params.id});

        theatre.name = req.body.name ? req.body.name  : theatre.name;
        theatre.description = req.body.description ? req.body.description : theatre.description;
        theatre.city = req.body.city ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode ? req.body.pinCode : theatre.pinCode;
        theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes;
        theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats;


        let updatedTheatre = await theatre.save();

        res.status(200).send({
            message : "Successfully updated Theatre ",
            data : updatedTheatre
        })

    }catch(err){
        console.log("Some Error while updating the theatre !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        });
    }
} 

exports.deleteTheatre = async (req, res)=>{
    try{
        
        let deletedTheatre = await Theatre.deleteOne({_id : req.params.id});

        res.status(200).send({
            message : "Successfully deleted Theatre ",
            data : deletedTheatre
        })

    }catch(err){
        console.log("Some Error while deleting the theatre !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        });
    }
} 

exports.findById = async (req, res)=>{
    try{
        let theatre = await Theatre.findById(req.params.id);

        res.status(200).send({
            message : "Successfully found Theatre ",
            data : theatre
        })

    }catch(err){
        console.log("Some Error while find by name the theatre !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        });
    }
} 

exports.Theatres = async (req, res)=>{
    try{
        let theatre = await Theatre.find();

        res.status(200).send({
            message : "Successfully found Theatre ",
            total : theatre.length,
            data : theatre
        })

    }catch(err){
        console.log("Some Error while find all the theatre !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        });
    }
} 