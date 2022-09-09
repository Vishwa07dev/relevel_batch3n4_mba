const User = require("../models/user.model");

const verifyUserCreationReqBody = async (req, res, next) => {
    try {

        if(!req.body.name){
            return res.status(400).send({
                message: "Name is not provided"
            });
        }

        if(!req.body.userId){
            return res.status(400).send({
                message: "UserId is not provided"
            });
        }else{
            const user = await User.findOne({
                userId : req.body.userId
            });

            if(user){
                return res.status(400).send({
                    message: "UserId already exists ..!"
                });
            }
        }

        if(!req.body.email){
            return res.status(400).send({
                message: "Email Id is not provided"
            });
        }else if(!String(req.body.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return res.status(400).send({
                message: "Email Id is not valid"
            });
        }else{
            const user = await User.findOne({
                email: req.body.email
            });

            if(user){
                return res.status(400).send({
                    message: "Email Id already exist, plz provide different Email"
                });
            }
        }

        if(!req.body.password){
            return res.status(400).send({
                message: "Password is not provided"
            });
        }

        if(!req.body.address){
            return res.status(400).send({
                message: "Address is not provided"
            });
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyUserSigninReqBody = async (req, res, next) => {
    try {

        if(!req.body.userId){
            return res.status(400).send({
                message: "UserId is not provided"
            });
        }
        if(!req.body.password){
            return res.status(400).send({
                message: "Password is not provided"
            });
        }

        next();
    } catch (err) {
        console.log("1- ",err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyUserAuthentication = {
    verifyUserCreationReqBody: verifyUserCreationReqBody,
    verifyUserSigninReqBody: verifyUserSigninReqBody
};
module.exports = verifyUserAuthentication;