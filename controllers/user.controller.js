const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

/**
 * Get all the users
 */
exports.findAll = async (req, res) =>{

    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;
    if(userTypeQP){
        queryObj.userType = req.query.userType;
    }
    if(userStatusQP){
        queryObj.userStatus= req.query.userStatus
    }

    try{
        const users = await User.find(queryObj);
        res.status(200).send(objectConverter.userRsponse(users));
    }catch(err){
        console.log("Error while fetching all the users");
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

/**
 * Get user by Id.
 */
exports.findByUserId = async (req, res) => {
    try{
    const user = await User.find({userId : req.params.id});
    return res.status(200).send(objectConverter.userRsponse(user))

    }catch(err){
        console.log("Error while accessing user details")
        return res.status(500).send({
            message: "Internal server error."
        })
    }

}
/**
 * Update the user
 */
exports.update = async(req, res) => {
    try{
        const user = await User.findOne({userId : req.params.id});

        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        
        const updatedUser = await user.save();

        res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus,
        })
    } catch (err) {
        console.log("Error whileDB operation", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}