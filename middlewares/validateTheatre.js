const Theatre = require('../models/theatre.model');
const constants = require('../utils/constants');

const validateTheatreRequestBody = (req, res, next) => {
    try{

        if(!req.body.name || !req.body.description || !req.body.city || !req.body.pinCode || !req.body.showTypes || !req.body.numberOfSeats ){
            return res.status(400).send({
                message : "Required field missed !! expected field [name, description, city, pincode, showTypes, numberOfSeats]"
            })
        }

        for(let i=0; i<req.body.showTypes.length; i++){
            if(!Object.values(constants.theatreShows).includes(req.body.showTypes[i])){
                return res.status(400).send({
                    message : "Invalid show Types provided expects [ MORNING, NOON, EVENING, NIGHT]"
                })
            }
        }

        if(!constants.validatePIN(req.body.pinCode)){
            return res.status(400).send({
                message : "Provided pincode is not valid"
            })
        }
        next()

    }catch(err){
        console.log("error in validateTheatreRequestBody");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const validateTheatreId = async (req, res, next) => {
    try{

        if(!constants.isValidObjectId(req.params.id)){
            return res.status(400).send({
                message : "provided id is invalid"
            })
        }

        const theatre = await Theatre.findOne({_id : req.params.id});
        if(!theatre){
            return res.status(400).send({
                message : "Theatre id is wrong"
            })
        }
        next()


    }catch(err){
        console.log("error in validateTheatreRequestBody");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}



const validateTheatre = {
    validateTheatreRequestBody : validateTheatreRequestBody,
    validateTheatreId : validateTheatreId
}
module.exports = validateTheatre