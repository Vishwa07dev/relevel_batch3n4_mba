const constants = require("../utils/constants")
const User = require('../models/user.model')

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

exports.validateSignUpRequestBody = async (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! User name is not provided"
        })
    }

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }

    if(req.body.userId){
        const user = await User.findOne({ userId: req.body.userId});

        if(user){
            return res.status(400).send({
                message: "User Id already exists"
            })
        }
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is not provided"
        })
    }

    if (!isValidEmail(req.body.email)) {
        return res.status(400).send({
            message: "Failed ! Not a valid email id"
        })
    }

    if(req.body.email){
        const user = await User.findOne({ email: req.body.email});

        if(user){
            return res.status(400).send({
                message: "User Email already exists"
            })
        }
    }

    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "ADMIN registartion is not allowed"
        }) 
    }

    const userTypes = [constants.userTypes.customer, constants.userTypes.theatre_owner ];

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "UserType provided is not correct. Possible correct values : CUSTOMER | THEATRE_OWNER"
        })
    }

    next();

}


exports.validateSignInRequestBody = (req, res, next) => {

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! userId is not provided"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    next();
}
