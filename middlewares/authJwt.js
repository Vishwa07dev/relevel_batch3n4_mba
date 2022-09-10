const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config")
const User = require("../models/user.model")
const constants = require("../utils/constants")

/**
 * Define verifyToken function
 */

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    /**
     * check if the token is provided
     */

    if(!token){
        return res.status(403).send({
            message: "No token provided ! Access denied.",
        })
    }

    /**
     * Validate the token.
     */
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "UnAuthorized ! Token verification failed."
            })
        }
        req.userId = decoded.id; //Read the value of the user id from the token and set it in the request for further use
        console.log(req.userId);
        next();
    })
}

/**
 * Define a function to check that requester is admin or not.
 */
const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});
    console.log(user, "#########  User ##########");

    if(user && user.userType === constants.userTypes.admin){
        next();
    } else {
        res.status(400).send({
            message : " Only admin user allowed to access this endpoint. "
        })
    }
}

/**
 * To check if user Id provided in request param is valid
 */

const isValidUserIdReqParam = async(req, res, next) => {
    try{
        const user = User.findOne({userId : req.param.id});
        if(!user){
            return res.status(400).send({
                message: "Internal server error while reading user data"
            })
        }
        next();
    }catch(err){
        console.log("Error while reading the user info", err.messgae);
        return res.status(500).send({
            message : "Internal server error while reading the user data."
        })
    }
}

/**
 * To check if caller is Admin or Owner for the request.
 */
const isAdminOrOwner = async(req, res, next) => {
     try{
        const callingUser = await User.findOne({userId : req.userId});
        if(callingUser.userType == constants.userTypes.admin
            || callingUser.userId == req.params.id){
            next();
        } else {
            res.status(403).send({
                message: "Only ADMIN ot the ower of Id is allowed to make this call"
            })
        }
    }catch(err){
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidUserIdReqParam : isValidUserIdReqParam,
    isAdminOrOwner : isAdminOrOwner
}

module.exports = authJwt;