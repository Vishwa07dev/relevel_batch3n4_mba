const User = require("../models/user.model")
const constants = require("../utils/constants")


const verifySignUpRequestBody = async (req,res,next) =>{

    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! user Name is not provided"
        })
    }

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! userId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! password is not provided"
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Failed ! email is not provided"
        })
    }

    if(!req.body.userType){
        return res.status(400).send({
            message : "Failed! userType is not provided"
        })
    }

    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "Admin registeration is not allowed"
        })
    }

    const userTypes = [constants.userTypes.customer,constants.userTypes.theatre_owner]
    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message: "Failed! userType is not correct Possible correct values : CUSTOMER | THEATRE_OWNER"
        })
    }


    const user = await User.findOne({userId: req.body.userId});
    if(user != null){
        return res.status(400).send({
            message : "Failed! user is already Exist"
        })
    }

    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Failed! not a valid email id"
        })
    }

    next();
}

const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


const verifySignInRequestBody = (req,res,next) =>{
    
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! password is not provided"
        })
    }
    next()
}

const verifyRequestBodies = {
    verifySignInRequestBody : verifySignInRequestBody,
    verifySignUpRequestBody  : verifySignUpRequestBody 

}
module.exports = verifyRequestBodies