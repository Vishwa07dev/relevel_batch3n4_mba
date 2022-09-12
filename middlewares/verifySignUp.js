const User = require("../models/user.model");
const constants = require("../utils/constants");

const validateSignupRequestBody = async(req, res, next) => {
    /**
     * verify the name is present.
     */
    if(!req.body.name){
        return res.status(400).send({
            message:"Sign Up Failed! User name not provided."
        });
    }
    /**
     * verify the userId is present
     */
    if(!req.body.userId){
        return res.status(400).send({
            message:"Sign Up Failed! UserId not provided."
        });    
    }
    /**
     * verify the user Id provided is unique
     */
    const user = await User.findOne({userId: req.body.userId});
    try{
    if(user != null){
        return res.status(400).send({
            message:"Sign Up Failed! UserId provided already exists."
        }); 
    }
    }catch(err){
        return res.status(400).send({
            message:"Some internal server error."
        }); 
    }
    /**
     * verify that password is provided
     */
    if(!req.body.password){
        return res.status(400).send({
            message:"Sign Up Failed! Password not provided."
        });
    }
    /**
     * verify the userType is provided
     */
    if(!req.body.userType){
        return res.status(400).send({
            message:"Sign Up Failed! UserType not provided."
        });
    }
    /**
     * verify that userType is not admin
     */
    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message:"Sign Up Failed! UserType can not be ADMIN."
        });
    }

    const userTypes = [constants.userTypes.customer, constants.userTypes.theatre_owner ];

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "UserType provided is not correct. Possible correct values are CUSTOMER or THEATRE_OWNER"
        })
    }
    /**
     * verify the email is provided and unique
     */
    if(!req.body.email){
        return res.status(400).send({
            message:"Sign Up Failed! Email not provided."
        });
    }
    if(!isValidEmail){
        return res.status(400).send({
            message:"Sign Up Failed! Not a valid email."
        });
    }
    
    next();
}

const isValidEmail = (email) => {
    return String(email).toLocaleLowerCase.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignInRequestBody =  (req, res, next) => {
    
    // Validate if the userId is present 
    if(!req.body.userId){
        return res.status(400).send({
            message:"Sign Up Failed! UserId not provided."
        });    
    }

    // Validate if the password is present
    if(!req.body.password){
        return res.status(400).send({
            message:"Sign Up Failed! Password not provided."
        });
    }
    next();
}

const verifyRequestBodyForAuth = {
    validateSignupRequestBody : validateSignupRequestBody,
    validateSignInRequestBody : validateSignInRequestBody
}

module.exports = verifyRequestBodyForAuth;