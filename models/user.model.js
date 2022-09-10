const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 10,
        lowercase : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.customer,
        enum : [constants.userType.customer, constants.userType.admin, constants.userType.theatre_owner]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]
    },
    theatresCreated : {
        type : [mongoose.SchemaType.ObjectId],
        default : [],
        ref : "Theatre"
    }
}, { timestamps : true , versionKey : false})

module.exports = mongoose.model("User", userSchema);