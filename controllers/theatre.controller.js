const Theatre = require('../models/theatre.model')

exports.createTheatre = async (req, res) => {

    try {

        const { name, description, city, pinCode,showTypes, numberOfSeats } = req.body;

        const theatreObject = {
            name, 
            description, 
            city, 
            pinCode, 
            showTypes, 
            numberOfSeats
        }

        const theatre = await Theatre.create(theatreObject);

        console.log(`#### New Theatre '${theatre.name}' created ####`);

        res.status(201).send({
            message: "Theatre created successfully",
            theatre
        });
        
    } catch (err) {
        console.log("#### Error while creating new theatre #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new theatre"
        });
    }

}

exports.updateTheatre = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });
        
        const { name, description, city, pinCode,showTypes, numberOfSeats } = req.body;
        
        theatre.name = name ? name :
        theatre.name;
        theatre.description = description ?
        description : theatre.description;
        theatre.city = city ? city :
        theatre.city;
        theatre.pinCode = pinCode ? pinCode :
        theatre.pinCode;
        theatre.showTypes = showTypes ? showTypes :
        theatre.showTypes;
        theatre.numberOfSeats = numberOfSeats ? numberOfSeats :
        theatre.numberOfSeats;
        
        await theatre.save();

        res.status(200).send({
            message: "Theatre Updated Successfully",
            theatre
        });
    } catch (err) {
        console.log("#### Error while updating theatre #### ", err);
        res.status(500).send({
            message : "Internal server error while updating theatre"
        });
    }
}

exports.getTheatre = async (req, res) => {

    try {
        let theatre;
        if(req.params.id){
            theatre = await Theatre.findOne({ _id: req.params.id });
        }else{
            theatre = await Theatre.find();
        }
        
        res.status(200).send({
            message: (req.params.id && theatre && theatre.length > 0) || (!req.params.id && theatre) ? "Theatre data's" : "No theatre data found",
            theatre
        });
    } catch (err) {
        console.log("#### Error while getting theatre #### ", err);
        res.status(500).send({
            message : "Internal server error while getting theatre"
        });
    }
}

exports.deleteTheatre = async (req,res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        await theatre.remove();

        console.log(`#### Theatre deleted ####`);
        res.status(200).send({message : "Theatre deleted"});

    }catch(err){
        console.log("#### Error while deleting theatre #### ", err.message);
        res.status(500).send({
            message : "Internal server error while deleting theatre"
        });
    }
}