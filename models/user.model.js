const mongoose = require("mongoose");
const constants = require('../utils/constants')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email:{
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        unique : true,
        minlength : 10
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    userType : {
        type: String,
        require : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.admin,constants.userTypes.customer, constants.userTypes.theatre_owner]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.pending, constants.userStatus.approved]
    },
},  {timestamps : true , versionKey : false})


module.exports = mongoose.model("user", UserSchema);

