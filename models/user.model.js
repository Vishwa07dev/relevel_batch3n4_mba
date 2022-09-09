const mongoose = require('mongoose');
const constant = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    userType: {
        type: String,
        required: true,
        default: constant.userTypes.customer,
        enum: [
            constant.userTypes.customer,
            constant.userTypes.owner,
            constant.userTypes.admin
        ]
    },
    userStatus: {
        type: String,
        required: true,
        default: constant.status.approved,
        enum: [
            constant.status.approved,
            constant.status.rejected,
            constant.status.pending,
        ]
    },
    theatresOwned: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "theatres"
    },
    moviesBooked: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "movies"
    }
},{ timestamps : true , versionKey : false})

module.exports = mongoose.model("users", userSchema)