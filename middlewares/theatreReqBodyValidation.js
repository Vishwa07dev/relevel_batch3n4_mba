const User = require('../models/user.model');
const Movie = require('../models/movie.model');

const ObjectId = require('mongoose').Types.ObjectId;
const constants = require("../utils/constants");

const allowedShowTypes = [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night];
 
function isValidObjectId(id){

    if (ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function checkShows (given){
    let temp = true;
    for(e of given){
        if (!allowedShowTypes.includes(e)){
            temp = false;
        }
    }
    return temp;
}

async function checkValidObjectIds (array){
    let temp = {validIds :true, moviesExist : true};
    for(e of array){
        if(!isValidObjectId(e)){
            temp.validIds = false;
        }else{
            const movie = await Movie.findOne({_id : e});
            if(!movie){
                temp.moviesExist = false;
            }
        }
    }
    return temp;
}


const validateTheatreBody = async (req,res,next)=>{
    try{

        if (req.user.userType == constants.userTypes.admin && !req.body.ownerId){
            return res.status(400).send({
                message: "Failed ! Theatre owner Id is not provided"
            });
        }
        
        if (req.body.ownerId){
            const thaetreOwner = await User.findOne({_id : req.body.ownerId})
                if (!thaetreOwner){
                    return res.status(400).send({
                        message: "Failed ! Theatre owner id provided does not exist"
                    });
                }
        }

        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Theatre title is not provided"
            });
        }
    

        if (!req.body.description) {
            return res.status(400).send({
                message: "Failed ! Theatre description is not provided"
            });
        }

        if (!req.body.city) {
            return res.status(400).send({
                message: "Failed ! Theatre city is not provided"
            });
        }

        if (!req.body.pinCode) {
            return res.status(400).send({
                message: "Failed ! Theatre Pin code is not provided"
            });
        }
        
        if (!req.body.showTypes) {
            return res.status(400).send({
                message: "Failed ! Movie casts are not provided"
            });
        }

        if (!req.body.numberOfSeats) {
            return res.status(400).send({
                message: "Failed ! Number of seates is not provided"
            });
        }

        next();
    }catch{
        console.log("rror while velidating new theatre request body", err.message);
        res.status(500).send({
            message : "Internal server error ..."
        });
    }
}



const validateTheatreRequestBody = {
    validateTheatreBody
}

module.exports = validateTheatreRequestBody