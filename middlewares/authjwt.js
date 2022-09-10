const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')
const constants = require('../utils/constants')


const verifyToken = (req,res,next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
        const user = await User.findOne({userId : decoded.id});
        req.user = user;
        next();
    })
}

const isAdmin = async (req,res,next)=>{
    const user = req.user;
    if (user && user.userType == constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message : "only ADMIN users are allowed to access this endpoint"
        })
    }
}


const isAdminOrOwner = async (req,res,next)=>{
    try {
        const callingUser = req.user;
        if(callingUser.userType==constants.userTypes.admin || callingUser.userId == req.params.userId){
            next();
        }else{
            return res.send(403).send({
                message : "Only admin or owner is allowed to make this call"
            })
        }
    }catch(err){
        console.log("#### Error while reading the user info ####", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }

}

const isTheatreOwnerOrAdmin = async (req,res,next)=>{
    try {
        const allowedUserTypes = [constants.userTypes.theatre_owner, constants.userTypes.admin]
        if(allowedUserTypes.includes(req.user.userType)){
            next();
        }else{
            return res.send(403).send({
                message : "Only admin or theatre owner is allowed to make this call"
            })
        }
    }catch(err){
        console.log("#### Error while authenticating the user info ####", err.message);
        return res.status(500).send({
            message : "Internal server error while authenticating the user data"
        })
    }
}

const isValidTheatreOwner = async (req,res,next)=>{
    try {
        if(req.user.userType==constants.userTypes.theatre_owner){
            const theatre = await Theatre.findOne({_id : req.params.id})
            if (theatre.ownerId.equals(req.user._id)){
                next()
            }else{
                return res.send(403).send({
                    message : "Only the owner of this theatre is allowed to make this call"
                })
            }
        }
    }catch(err){
        console.log("#### Error while authenticating the user info ####", err.message);
        return res.status(500).send({
            message : "Internal server error while authenticating the user data"
        })
    }
}


const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner,
    isTheatreOwnerOrAdmin : isTheatreOwnerOrAdmin,
    isValidTheatreOwner : isValidTheatreOwner
}

module.exports = authJwt