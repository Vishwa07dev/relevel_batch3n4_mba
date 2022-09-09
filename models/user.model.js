const mongoose = require('mongoose');
const {userType , userStatus} = require('../utils/constants');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    userType : {
        type : String,
        enum : [userType.admin, userType.theatreOwner, userType.customer ],
        default  : userType.customer
    },
    status : {
        type : String,
        enum : [ userStatus.approved, userStatus.pending, userStatus.rejected],
        default : userStatus.pending
    }
},{
    timestamps : true, versionKey : false
});

module.exports = mongoose.model("User", userSchema);