const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { userStatus, userTypes,} = require('../utils/constants');

const validateSignUpRequestBody = async (req, res, next) =>{

    try{
        if(!req.body.name){
            res.status(400).send({
                message : "Failed ! name is not provided "
            });
            return;
        }
    
        if(!req.body.userId){
            res.status(400).send({
                message : "Failed ! userId is not provided "
            });
            return;
        }
        const user = await User.findOne({userId : req.body.userId});
        if(user != null){
            res.status(400).send({
                message : "Failed ! userId is already taken"
            });
            return;
        }

        if (!req.body.password) {
            res.status(400).send({
                message: "Failed ! Password is not provided"
            });
            return;
        }
    
        if(!req.body.email){
            res.status(400).send({
                message : "Failed ! email is not provided"
            });
            return;
        }
    
        if(!isValidEmail(req.body.email)){
            res.status(400).send({
                message : "Failed ! Not a valid email id"
            });
            return;
        }
        if(!req.body.userType){
            res.status(400).send({
                message : "Failed ! userType is not passed"
            });
            return;
        }
    
        if(req.body.userType == userTypes.admin){
            res.status(400).send({
                message : "ADMIN registartion is not allowed"
            });
            return;
        }

        const userType = [userTypes.customer, userTypes.theatre_owner];

        if(!userType.includes(req.body.userType)){
            return res.status(400).send({
                message : "UserType provided is not correct values : CUSTOMER | THEATRE_OWNER "
            })
        }
        next();
    
    }catch(err){
        console.log("Some Error while Validate the SignUp User !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
    
}
const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}


const validateSignInRequestBody = async (req, res, next) =>{

    try{
        if(!req.body.userId){
            res.status(400).send({
                message : "Failed ! userId is not provided"
            });
            return;
        }
    
        if(!req.body.password){
            res.status(400).send({
                message : "Failed ! password is not provided"
            });
            return;
        }
        const user = await User.findOne({
            userId : req.body.userId
        })
        if(user == null){
            res.status(404).send({
                message : "UserId is not found !"
            });
            return;
        }

        const isValidPassword = bcrypt.compareSync(req.body.password , user.password);
        if(isValidPassword == false){
            res.status(400).send({
                message : "Wrong Password !"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Some Error while Validate the SignIn User !", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}

const verifyRequestBodiesForAuth = {
    validateSignUpRequestBody : validateSignUpRequestBody,
    validateSignInRequestBody : validateSignInRequestBody
}

module.exports = verifyRequestBodiesForAuth;