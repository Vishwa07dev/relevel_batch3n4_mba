const mongoose=require("mongoose")
const constants=require("../utils/constants")
const paymentSchema=new mongoose.Schema({
    bookedId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Booking"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:[constants.paymentStatus.failed,constants.paymentStatus.success]
    },
    createAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
},{versionKey:false,timestamps:true});


module.exports=mongoose.model("Payment",paymentSchema)