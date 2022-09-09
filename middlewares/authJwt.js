const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const constants = require('../utils/constants');

const verifyToken = (req, res, next) => {


    const token = req.headers[authConfig.tokenHeader];

    if(!token) {
        return res.status(403).send({
            message : "No token is provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (error, decoded) =>  {
        if(error) {
            return res.status(401).send({
                message : "UnAuthorized"
            });
        }

        const user = await User.findOne({ userId : decoded.id });
        req.user = user

        next();
    })

}

const isAdmin = async (req, res, next) => {
    try {

        if(req.user && req.user.userType == constants.userTypes.admin){

            next();
        } else{
            res.status(403).send({
                message : "Only ADMIN users are allowed to access this endPoint"
            })
        }
    } catch (err) {
        console.log("Error while validaing isadmin", err.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
}


const isValidObjIdInReqParam = async (req, res, next) => {
    try {
        const theatre = await Theatre.findOne({ _id : req.params.id });
        const movie = await Movie.findOne({ _id : req.params.id });
        if (!theatre && !movie) {
            return res.status(400).send({
                message: "obj_Id passed doesn't exist"
            })
        }else if(theatre){
            req.paramTheatre = theatre;  //if i wanna use the theatre anywhere in the next calls
        }else {
            req.paramMovie = movie;  //if i wanna use the movie anywhere in the next calls
        }
       
        next();
    } catch (err) { 
        console.log("Error :  ", err.message);
        
        return res.status(500).send({
            message: "Internal server error "
        });
    }
}

const isTheatreOwnerOrAdmin = async (req,res, next) =>{
    try {

        const user = await User.findOne({
            _id: req.user._id
        });

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        if(user.userType != constants.userTypes.admin){
            if(theatre.owner.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the THEATRE_OWNER/ADMIN has access"
                })
            }
        }
        
        next();
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Some internal error" 
        })
    }
}


const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidObjIdInReqParam : isValidObjIdInReqParam,
    isTheatreOwnerOrAdmin : isTheatreOwnerOrAdmin
};
module.exports= authJwt;