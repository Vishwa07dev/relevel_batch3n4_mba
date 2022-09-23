require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');
const objectConverter = require('../utils/objectConverter')


exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password, 8),
        userStatus : req.body.userType == constants.userTypes.customer ? constants.userStatus.approved : constants.userStatus.pending
    };

    try{
        const userCreated = await User.create(userObj);

        console.log(`#### ${userCreated.userType} ${userCreated.name} created ####`);
        res.status(201).send(objectConverter.singleUserResponse(userCreated));
    }catch(err){
        console.log("#### error while user sign up #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating user"
        });
    }
}

exports.signin = async (req,res)=>{
    try{
        const user = await User.findOne({userId : req.body.userId})
        if(!user){
            return res.status(400).send({
                message : "Failed! userId passed dosen't exist"
            });
        }
        
        if(user.userStatus == constants.userStatus.pending){
            return res.status(400).send({
                message : "User is not yet approved from the admin"
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        const token = jwt.sign({id: user.userId}, authConfig.secret, {expiresIn : process.env.JWT_TIME});
        const refreshToken=jwt.sign({
            id: user.userId
        },authConfig.refreshToken,
        {
            expiresIn:600000 //wait for 10 minute
        }
        )
        console.log(`#### ${user.userType} ${user.name} logged in ####`);

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accesToken : token,
            refreshToken:refreshToken
        });
    }catch(err){
        console.log("#### Error while user sign in ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}

exports.refreshToken= (req,res)=>{
    const refreshToken=req.headers["x-refresh-token"]

    if(!refreshToken){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }
    
    jwt.verify(refreshToken,authConfig.refreshToken,async(err,decoded)=>{
        if(err)
        {
            return res.status(400).send({
                message:"Unauthorised"
            })
        }
       else{
            const user = await User.findOne({userId : decoded.id});
            if(!user){
                return res.status(400).send({
                message : "The user that this token belongs to does not exist"
                })
            }
            
            const accesToken=jwt.sign({
                id:user.userId
            },authConfig.secret,{
                expiresIn:600000
            });
           return res.status(200).send({
            accesToken:accesToken})
          
        }
    });
    
}