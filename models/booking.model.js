const mongoose=require("mongoose")
const constants=require("../utils/constants")
const bookingSchema=new mongoose.Schema({
    totalCost:{
        type:Number,
        required:true
    },
    theatreId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Theatre"
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Movie"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    
    status:{
        type:String,
        default:constants.bookingStatus.in_progress,
        enum:[constants.bookingStatus.cancelled,constants.bookingStatus.completed,constants.bookingStatus.failed,constants.bookingStatus.in_progress]
    },
    noOfSeats:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updateAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
    
},{ timestamps : true , versionKey : false});

module.exports=mongoose.model("booking",bookingSchema);