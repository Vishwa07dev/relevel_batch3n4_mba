const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model')


const verifyToken = (req, res, next) => {
    try{

    const token = req.headers["x-access-token"]

    if(!token){

        return res.status(403).send({
            message : "Failed !! Token is not Provided !!!"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {

        if(err){
            return res.status(401).send({
                message : "Failed !! UnAuthorized !!!"
            })
        }
        req.userId = decoded.id  // I am taking the user Id from token and attachong it in request object
        next()
    })

    }catch(err){
        console.log("Error in token valodation : ", err.message)
        res.status(500).send("Internal server error")
    }
    
};

const isAdmin = async (req, res, next) => {
    try{

        const user = await User.findOne({userId : req.userId});

        if(user && user.userType == constants.userType.admin){
            next()

        }else{

            return res.status(403).send({
                message : "Failed !! Only ADMIN can access this endpoint !!!"
            })
        }

    }catch(err) {
        console.log("Error in isAdmin valodation: ", err.message)
        res.status(500).send("Internal server error")
    }
}

const isAdminOrTheatreOwner = async (req, res, next) => {
    try{

        const user = await User.findOne({userId : req.userId});
        if(user.userType == constants.userType.customer){
            return res.status(401).send({
                message : "Only admin or theatre owner can hit this api"
            })
        }
        next()

    }catch(err){
        console.log("error in isAdminOrTheatreOwnwe validation");
        res.status(500).send("Internal Server Error")
    }
};

const isAdminOrMovieCreater = async (req, res, next) => {
    try{

        const movie = await Movie.findOne({_id : req.params.id});

        const user = await User.findOne({userId : req.userId});
        
        if(movie.creater.equals(user._id) || user.userType == constants.userType.admin){
            next()

        }else{
            return res.status(401).send({
                message : "only admin and movie creater can not hit this api"
            })
        }
        

    }catch(err){
        console.log("error in isAdminOrMovieCreater middlewares");
        res.status(500).send({
            message : "Internal Serveer Error"
        })
    }
};

const isAdminOrTheatreCreater = async (req, res, next) => {
    try{

        const user = await User.findOne({userId : req.userId});
        console.log(user);
        const theatre = await Theatre.findOne({_id : req.params.id}) 
        console.log(theatre)
        if(theatre.creater.equals(user._id) || user.userType == constants.userType.admin){
            next()

        }else{
            return res.status(401).send({
                message : "Only admin "
            })
        }

    }catch(err){
        console.log("error in isAdminOrTheatreCreater middlewares");
        res.status(500).send({
            message : "Internal Serveer Error"
        })
    }
}


const authRequestValidator = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrTheatreOwner : isAdminOrTheatreOwner,
    isAdminOrMovieCreater : isAdminOrMovieCreater,
    isAdminOrTheatreCreater : isAdminOrTheatreCreater
}

module.exports = authRequestValidator;