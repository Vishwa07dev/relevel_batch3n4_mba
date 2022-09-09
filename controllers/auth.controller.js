const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require('../configs/auth.config')
const objectConverter = require("../utils/objectConverter");


/**
 * Controller for signup/registration
 */
exports.signup = async (req, res) => {

    try {
        

        if(req.body.userType == constants.userTypes.admin){
            res.status(200).send({
                message: "Currently ADMIN Singup is not allowed"
            });
        }

 
        const userObjCreated = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            address: req.body.address,
            userType: req.body.userType
        }

        const user = await User.create(userObjCreated);

        res.status(201).send(objectConverter.userResponse([user]));
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "some internal error"
        })
    }

}


exports.signin = async (req, res) => {
    /**
     * If the userId passed is incorrect
     */
     try {
        const user = await User.findOne({userId : req.body.userId});
        
        if(user == null){
            return res.status(400).send({
                message : "Failed to login. UserId passed is't correct"
            })
        }

        const passwordIsVaild = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordIsVaild){
            return res.status(401).send({
                message : "Worng Password"
            })
        }

        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret, {
            expiresIn : 600
        });

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accessToken : token
        })
     } catch (err) {
        console.log("Internal error, ", err.message);
        res.status(500).send({
            message : "Some internal error occured while signin"
        });
     }
}