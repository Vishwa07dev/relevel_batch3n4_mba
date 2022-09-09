const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const {userStatus, userType } = require('../utils/constants');


exports.signup = async (req, res) =>{
    

    if(req.body.userType != userType.customer){
        req.body.status = userStatus.pending
    }
    if(req.body.userType == userType.admin){
        res.status(400).send({
            message : "Only  CUSTOMER || THEATREOWNER can signup !"
        });
        return;
    }
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8),
        userStatus : req.body.userStatus
    };

    try{
        const userCreated = await User.create(userObj);

        const response = {
            name : userCreated.name,
            userid : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(response);
    }catch(err){
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message : "Some internal server error"
        });
    }
}

exports.signin = async (req, res) =>{

    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            return res.status(400).send({
                message : "Failed ! UserId passed doesn't exist"
            });
        }

        if(user.status == userStatus.pending){
            return res.status(400).send({
                message : "Not yet approved from the admin"
            })
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong Password"
            });
        }


        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret,{
            expiresIn : 600
        });

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        });

    }catch(err){
        console.log("Internal Error , ", err.message);
        res.status(500).send({
            message : "Some internal error while signin"
        })
    }

}