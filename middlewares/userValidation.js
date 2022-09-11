const User = require("../models/user.model");
const constants = require("../utils/constants")

const validateSignUpRequestBody = async (req, res, next) => {

    // Validate if name is present
    if (!req.body.name||req.body.name==" ") {
        return res.status(400).send({
            message: "Failed ! User name is not provided"
        })
    }

    // Validate if the userId is present and it's not duplicate
    if (!req.body.userId ||req.body.userId==" ") {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }
    try {
        const user = await User.findOne({ userId: req.body.userId });
        if (user != null) {
            return res.status(400).send({
                message: "Failed ! UserId is already taken"
            })
        }
    } catch (err) {

        return res.status(500).send({
            message: "Internal server error while validating the request"
        })
    }

    //Validate if the password is present or not
    /**
     * Logic to do extra valdiations :
     * 1. it should be of minimum length 10
     * 2. Alphabets, numerics and special character atleanst one
     */
    if (!req.body.password ||req.body.password==" ") {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    //Validate if the email is present, is valid and not duplicate
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
    // Validate if the userType is present and valid
    if(!req.body.userType || req.body.userType==" "){
        return res.status(400).send({
            message: "Failed ! User type is not passed"
        });
    }

    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "ADMIN registartion is not allowed"
        }) 
    }

    const userTypes = [constants.userTypes.customer, constants.userTypes.theatre_owner ];

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "UserType provided is not correct. Possible correct values : CUSTOMER | ENGINEER"
        })
    }


    
    next(); // Give conrol to the next middleware or controller

}

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}



validateSignInRequestBody = (req, res, next) => {
    
    // Validate if the userId is present 
    if (!req.body.userId ||req.body.userId==" ") {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }

    if (!req.body.password || req.body.password==" ") {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    next();
}


const verifyRequestBodiesForAuth = {
    validateSignUpRequestBody : validateSignUpRequestBody ,
    validateSignInRequestBody : validateSignInRequestBody
};

module.exports = verifyRequestBodiesForAuth