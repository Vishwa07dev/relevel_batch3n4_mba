const Theatre = require('../models/theatre.model');
const validateTheatreRequestBody = async (req, res, next)=>{
    try{
        
        if(!req.body.name){
            res.status(400).send({
                message : "Theatre name is not provided !"
            });
            return;
        }
        
        const theatre = await Theatre.findOne({name : req.body.name});
        
        if(theatre != null){
            res.status(400).send({
                message : "name is already taken !"
            });
            return;
        }

        if(!req.body.description){
            res.status(400).send({
                message : "Theatre description is not provided !"
            });
            return;
        }

        
        if(!req.body.city){
            res.status(400).send({
                message : "Theatre city is not provided !"
            });
            return;
        }

        
        if(!req.body.pinCode){
            res.status(400).send({
                message : "Theatre pinCode is not provided !"
            });
            return;
        }

        if(!req.body.numberOfSeats){
            res.status(400).send({
                message : "Theatre numberOfSeats is not provided !"
            });
            return;
        }
        next();

    }catch(err){
        console.log("Some Error while Validating the theatre's Body", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}

const theatreValidator = {
    validateTheatreRequestBody
};
module.exports = theatreValidator;