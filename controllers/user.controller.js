const User = require('../models/user.model');
const constants = require('../utils/constants');


exports.update = async (req, res) => {
    try{

        const user = await User.findOne({userId : req.params.id});

        if(user.userStatus != req.body.userStatus || user.userType != req.body.userType){

            if(user.userType == constants.userType.admin){
                user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
                user.userType = req.body.userType != undefined ? req.body.userType : user.userType

            }else{
                return res.status(401).send({
                    message : "Only admin can change userStatus"
                })
            }
        }
        

        if(user.userId == req.userId || user.userType == constants.userType.admin){
            user.name = req.body.name != undefined ? req.body.name : user.name

        }else{
            return res.status(401).send({
                message : "only admin or owner can do this change"
            })
        }


        const updatedUser = await user.save();
        res.status(200).send({
            name : updatedUser.name,
            userId : updatedUser.userId,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus
        })

    }catch(err){
        console.log("erroe in updating user data : ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}