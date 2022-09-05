const Theatre = require('../models/theatre.model');

exports.createTheatre = async (req, res) => {
    try{

        const data = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats
        }
    
        const theatre = await Theatre.create(data);

        res.status(201).send(theatre);

    }catch(err){
        console.log("error in creating theatre");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.findAllTheatre = async (req, res) => {
    try{

        const theatres = await Theatre.find();
    
        res.status(200).send(theatres);

    }catch(err){
        console.log("error in finding all theatre");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.findThreatreById = async (req, res) => {
    try{

        const theatre = await Theatre.findOne({_id : req.params.id});
    
        res.status(200).send(theatre);

    }catch(err){
        console.log("error in find thretre by Id theatre");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.updateTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        theatre.name = req.body.name ? req.body.name : theatre.name,
        theatre.description = req.body.description ? req.body.description : theatre.description,
        theatre.city = req.body.city ? req.body.city : theatre.city,
        theatre.pinCode = req.body.pinCode ? req.body.pinCode : theatre.pinCode,
        theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes,
        theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats

        const updatedTheatre = await theatre.save();
        res.status(200).send(updatedTheatre);

    }catch(err){
        console.log("error in updating theatre");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.deleteTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        await theatre.remove();

        res.status(200).send({message : "Theatre deleted"});

    }catch(err){
        console.log("error in deleting theatre");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}