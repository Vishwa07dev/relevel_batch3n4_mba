const User = require('../models/user.model');
const authConfig = require('../configs/auth.config');
const jwt = require('jsonwebtoken');

const { userType } = require('../utils/constants');


const verifyToken = (req, res, next) =>{
    
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided ! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{

        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id;
        next();
    })

}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == userType.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

const isTheatreOwner = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == userType.theatreOwner){
        next();
    }else{
        res.status(403).send({
            message : "Only theatre's Owner users are allowed to access this endpoint"
        })
    }
}


const authJwt = {
    verifyToken,
    isAdmin,
    isTheatreOwner
}

module.exports = authJwt;