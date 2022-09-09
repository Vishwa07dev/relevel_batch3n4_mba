const User = require('../models/user.model');
const authConfig = require('../configs/auth.config');
const jwt = require('jsonwebtoken');

const constants = require('../utils/constants');


const verifyToken = (req, res, next) =>{

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided !"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{

        if(err){
            return res.status(401).send({
                message : "Unauthorized Token"
            });
        }
        req.userId = decoded.id;
        next();
    })

}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userTypes.admin){
        req.user = user;
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN are allowed..!"
        })
    }
}

const isTheatreOwner = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userTypes.owner){
        req.user = user;
        next();
    }else{
        res.status(403).send({
            message : "Only Theatre's Owner are allowed..!"
        })
    }
}

const isTheatreOwnerOrAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && (user.userType == constants.userTypes.owner || user.userType == constants.userTypes.admin)){
        req.user = user;
        next();
    }else{
        res.status(403).send({
            message : "Only Theatre's Owner or Admin's are allowed..!"
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isTheatreOwner,
    isTheatreOwnerOrAdmin
}

module.exports = authJwt;