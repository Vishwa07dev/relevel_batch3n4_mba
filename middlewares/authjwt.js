const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const Booking = require('../models/booking.model')
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
        if(!user){
            return res.status(400).send({
                message : "The user that this token belongs to does not exist"
            })
        }
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
        if(callingUser.userType==constants.userTypes.admin || callingUser.userId == req.params.id){
            next();
        }else{
            return res.status(403).send({
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
            const theatre = req.theatreInParams
            if (!theatre.ownerId.equals(req.user._id)){
                return res.send(403).send({
                    message : "Only the owner of this theatre is allowed to make this call"
                })
            }
        }
        next();
    }catch(err){
        console.log("#### Error while authenticating the user info ####", err.message);
        return res.status(500).send({
            message : "Internal server error while authenticating the user data"
        })
    }
}

const isAdminOrOwnerOfBooking = async (req, res, next) => {
    try {

        // check if ADMIN or USER is valid OWNER
        if(req.user.userType != constants.userTypes.admin){
            if(req.bookingInParams.userId.valueOf() != req.userInParams._id.valueOf()){
                return res.status(400).send({
                    message: "Only the owner of the booking/admin has access to this operation"
                });
            }
        }
        
        next();
    } catch (err) {
        console.log("Error while validating usertype is admin/ownerOfBooking", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const isAdminOrOwnerOfPayment = async (req, res, next) => {
    try {

        if(req.user.userType != constants.userTypes.admin && !req.user.myPayments.includes(req.params.id)){
            return res.status(400).send({
                message: "Only the owner of the payment/admin has access to this operation"
            });
        }
        
        next();
    } catch (err) {
        console.log("Error while validating usertype is admin/ownerOfPayment", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isAdminOrOwner,
    isTheatreOwnerOrAdmin,
    isValidTheatreOwner,
    isAdminOrOwnerOfBooking,
    isAdminOrOwnerOfPayment
}

module.exports = authJwt