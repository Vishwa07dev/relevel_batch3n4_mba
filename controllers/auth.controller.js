const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")


/**
 * Code for Sign Up logic 
 */

exports.signUp = async (req, res) => {

    await User.collection.drop();

    
    if(req.body.userType != constants.userTypes.customer){
        req.body.userStatus = constants.userStatus.pending;
    }

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8),
        email : req.body.email,
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    try{

        const userCreated = await User.create(userObj);

        const response = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt
        }

        res.status(201).send(response);

    }catch(err){
        console.log("Some interal error.", err.message);
        res.status(500).send({
            message: "Some internal server error."
        })
    }
}

/**
 * Code for Sign In logic
 */

exports.signIn = async (req, res) => {

    try{
    /**
     * If the userId passed is correct
     */
    const user = await User.findOne({userId : req.body.userId})

    if(user == null){
        console.log(user);
        return res.status(400).send({
            message: "UserId doesn't exist."
        });
    } 

    /**
     * If the password passed is correct
     */
     const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
     if(!isPasswordValid){
        return res.status(401).send({
            message :"Incorrect password."
        })
    }

    /**
     * Check if the user is in PENDING state
     */
    if(user.userStatus == constants.userStatus.pending){
        return res.status(400).send({
            message : "Login failed! User is in pending state."
        })
    }
    

    
     /**
     * Create the JWT token
     */
    const token = jwt.sign({
        id : user.userId
    }, authConfig.secret,{
        expiresIn : 500
    });

    /**
     * Send the successfull login response
     */
     res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    });
    }catch(err){
        console.log("some internal error happen", err.message)
        res.status(500).send({ message : "Internal server error" })
    }
}


