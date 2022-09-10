const User = require('../models/user.model');
const Movie = require('../models/movie.model')

const ObjectId = require('mongoose').Types.ObjectId;
const constants = require("../utils/constants");

const allowedShowTypes = [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night]
 
function isValidObjectId(id){

    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function checkShows (given){
    let temp = true;
    given.forEach(e => {
        if(!allowedShowTypes.includes(e)){
            temp = false
        }
    })
    return temp;
}

function checkValidObjectIds (array){
    let temp = {validIds :true, moviesExist : true};
    array.forEach(async e => {
        if(!isValidObjectId(e)){
            temp.validIds = false;
        }else{
            let movie = await Movie.findOne({_id : e})
            if(!movie){
                moviesExist = false
            }
        }
    })
    return temp;
}


const newTheatreBody = async (req,res,next)=>{
    try{

        if (req.user.userType == constants.userTypes.admin && !req.body.ownerId){
            return res.status(400).send({
                message: "Failed ! Theatre owner Id is not provided"
            });
        }
        
        if (req.body.ownerId){
            if(!isValidObjectId(req.body.ownerId)){
                return res.status(400).send({
                    message: "Failed ! Invalid theatre owner Id provided"
                });
            }else{
                const owner = await User.findOne({_id : req.body.ownerId})
                if(!owner){
                    return res.status(400).send({
                        message: "Failed ! Theatre owner id provided does not exist"
                    });
                }
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
        }else if (typeof req.body.pinCode !== "number"){
            return res.status(400).send({
                message: "Failed ! Pin code is not in correct format (Number)"
            });
        }
        
        if (!req.body.showTypes) {
            return res.status(400).send({
                message: "Failed ! Movie casts are not provided"
            });
        }else{
            if (!Array.isArray(req.body.showTypes)){
                return res.status(400).send({
                    message: "Failed ! Movie show types are not in correct format (Array)"
                });
            }else if (!checkShows(req.body.showTypes)){
                return res.status(400).send({
                    message: "Failed ! invalid show type provided"
                });
            }
        }

        if (!req.body.numberOfSeats) {
            return res.status(400).send({
                message: "Failed ! Theatre number of seates is not provided"
            });
        }else if (typeof req.body.numberOfSeats !== "number"){
            return res.status(400).send({
                message: "Failed ! Number of seates is not in correct format (Number)"
            });
        }

        next();
    }catch{
        console.log("#### Error while velidating new theatre request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while new theatre body validation"
        });
    }
}

const editTheatreBody = (req,res,next)=>{
    try{

        if (req.body.pinCode && typeof req.body.pinCode !== "number"){
            return res.status(400).send({
                message: "Failed ! Theatre pin code is not in correct format (Number)"
            });
        }

        if (req.body.showTypes){
            if(!Array.isArray(req.body.showTypes)){
                return res.status(400).send({
                    message: "Failed ! Movie show types are not in correct format (Array)"
                });
            }else if (!checkShows(req.body.showTypes)){
                return res.status(400).send({
                    message: "Failed ! invalid show type provided"
                });
            }
        }

        if (req.body.numberOfSeats && typeof req.body.numberOfSeats !== "number"){
            return res.status(400).send({
                message: "Failed ! Number of seates is not in correct format (Number)"
            });
        }
    
        next();
    }catch{
        console.log("#### Error while velidating edit theatre request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while edit theatre body validation"
        });
    }
}

const editMoviesInTheatreBody = (req,res,next)=>{
    try{

        if (req.body.addMovies){

            if (!Array.isArray(req.body.addMovies)){
                return res.status(400).send({
                    message: "Failed ! Movie ids in addMovies are not in correct format (Array)"
                });
            }

            const checker = checkValidObjectIds(req.body.addMovies)

            if (!checker.validIds){
                return res.status(400).send({
                    message: "Failed ! Invalid movie id provided in addMovies"
                });
            }else if (!checker.moviesExist){
                return res.status(400).send({
                    message: "Failed ! Movie id provided in addMovies does not exist"
                });
            }

            req.body.addMovies = req.body.addMovies.filter(e => !req.theatreInParams.movies.includes(e));

        }

        if (req.body.removeMovies){

            if (!Array.isArray(req.body.removeMovies)){
                return res.status(400).send({
                    message: "Failed ! Movie ids in removeMovies are not in correct format (Array)"
                });
            }

            const checker = checkValidObjectIds(req.body.removeMovies)

            if (!checker.validIds){
                return res.status(400).send({
                    message: "Failed ! Invalid movie id provided in removeMovies"
                });
            }else if (!checker.moviesExist){
                return res.status(400).send({
                    message: "Failed ! Movie id provided in removeMovies does not exist"
                });
            }

            req.body.removeMovies = req.body.removeMovies.filter(e => req.theatreInParams.movies.includes(e));
            
        }



    }catch{
        console.log("#### Error while velidating edit movie in theatre request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while edit movie in theatre body validation"
        });
    }
}



const validateTheatreRequestBodies = {
    newTheatreBody,
    editTheatreBody,
    editMoviesInTheatreBody
}

module.exports = validateTheatreRequestBodies