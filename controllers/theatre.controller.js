const Theatre = require("../models/theatre.model");

exports.createTheatre = async (req,res) => {
    try {
        const theatreObj = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showType : req.body.showType,
            numberOfSeats : req.body.numberOfSeats
        }

        const createdTheatre = await Theatre.create(theatreObj);

        return res.status(200).send({
            message : "Theatre created successfully.",
            thetreId : createdTheatre._id,
            theatreObj
        });
    } catch (err) {
        res.status(500).send({
            message : `Internal server error while creating the theatre : ${err}`
        }); 
    }
}

exports.updateTheatre = async (req,res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});

        if(theatre.isDeleted == true){
            return res.status(404).send({
                message : `Theatre with id ${req.params.id} is not available in the database anymore.`
            })
        }

        theatre.name = req.body.name ? req.body.name : theatre.name;
        theatre.description = req.body.description ? req.body.description : theatre.description;
        theatre.city = req.body.city ? req.body.city : theatre.city;
        theatre.pincode = req.body.pinCode ? req.body.pinCode : theatre.pinCode;
        showType = req.body.showType ? req.body.showType : theatre.showType;
        numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats;

        const updatedTheatre = await theatre.save();

        return res.status(200).send({
            message : "Theatre updated successfully",
            theatreId : updatedTheatre._id,
            updatedTheatre
        })
    } catch (err) {
        res.status(500).send({
            message : `Internal server error while updating the theatre : ${err}`
        });
    }  
}

exports.getTheatreById = async (req,res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        return res.status(200).send(theatre);

    } catch (err) {
        res.status(500).send({
            message : `Internal server error while getting the theatre by ID : ${err}`
        });
    }  
}

exports.getAllTheatre = async (req,res) => {
    try {
        const theatres = await Theatre.find({isDeleted : false});
        return res.status(200).send(theatres);
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while getting all the theatres : ${err}`
        }); 
    }
}

exports.deleteTheatre = async (req,res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});

        if(theatre.isDeleted == true){
            return res.status(404).send({
                message : `Theatre with id ${req.params.id} is not available in the database anymore.`
            })
        }

        theatre.isDeleted = true;
        await theatre.save();

        return res.status(200).send({
            message : `Theatre ${req.params.id} has been deleted successfully.`
        })
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while deleting the theatre : ${err}`
        }); 
    } 
}
