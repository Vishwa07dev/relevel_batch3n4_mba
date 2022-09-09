const mongoose = require("mongoose");
 const constants = require("../utils/constants");

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
     email : {
        type : String,
        required : true,
        unique : true
    },
     password :{
         type : String,
         required : true
     },
     address : {
         city: {
             type: String,
             required: true
         },
         pinCode : {
            type : Number,
            required : true
        }
     },
     userType : {
         type : String,
         required : true,
         default : constants.userTypes.customer,
         enum : [constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.theatreOwner]
     },
     theatresOwned : {
         type : [mongoose.SchemaTypes.ObjectId],
         default : [],
         ref : "Theatre"
     }
 }, { timestamps: true, versionKey: false });
 
 module.exports = mongoose.model("User", userSchema);