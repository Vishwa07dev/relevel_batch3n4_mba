const User = require('../models/user.model');
const {userStatus} = require('../utils/constants');
exports.verifyOwner = async (req, res) =>{
    try{
        const user = await User.findOne({userId : req.params.id});
        user.status = userStatus.approved;
        const updatedUser = await user.save();
        res.status(200).send({
            message : ` Successfully verify the Theatre Onwer ${updatedUser.userId} `
        })
    }catch(err){
        console.log("Some error while verify the owner", err.message);
        res.status(500).send({
            message : "Some Interanal Error !"
        })
    }
}