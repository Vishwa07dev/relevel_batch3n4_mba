const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')
const Booking = require('../models/booking.model')
const Payment = require('../models/payment.model')

const jwt = require('jsonwebtoken');
const ObjectId = require("mongoose").Types.ObjectId

const userInParams = async (req,res,next)=>{

    try{

        const user = await User.findOne({userId : req.params.id});

        if(!user){
            return res.status(400).send({
                message : "userId passed dosen't exist"
            })
        }
        req.userInParams = user;
        next();
        
    }catch(err){
        console.log("#### Error while reading the user info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }
}

const theatreInParams = async (req,res,next)=>{

    try{

        const theatre = await Theatre.findOne({_id : req.params.id});

        if(!theatre){
            return res.status(400).send({
                message : "Theatre Id passed dosen't exist"
            })
        }
        req.theatreInParams = theatre;
        next();
        
    }catch(err){
        console.log("#### Error while reading the theatre info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the theatre data"
        })
    }
}

const movieInParams = async (req,res,next)=>{

    try{

        const movie = await Movie.findOne({_id : req.params.id});

        if(!movie){
            return res.status(400).send({
                message : "Movie Id passed dosen't exist"
            })
        }
        req.movieInParams = movie;
        next();
        
    }catch(err){
        console.log("#### Error while reading the movie info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the movie data"
        })
    }
}


const bookingInParams = async (req, res, next) =>{
    try{

        if(!ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "Booking Id is not valid Obj Id"
            })
        }

        const booking = await Booking.findOne({
            _id: req.params.id
        });

        if(!booking){
            return res.status(400).send({
                message: "Booking ID provided is not a valid one"
            });
        }

        req.bookingInParams = booking;

        next();

    }catch(err) {
        console.log("error while validating booking Id", err.message);

        return res.status(500).send({
            message : "Some internal error"
        })
    }
}

const paymentInParams = async (req,res,next)=>{

    try{

        const payment = await Payment.findOne({_id : req.params.id});

        if(!payment){
            return res.status(400).send({
                message : "Payment Id passed dosen't exist"
            })
        }
        req.paymentInParams = payment;
        next();
        
    }catch(err){
        console.log("#### Error while reading the payment info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the payment data"
        })
    }
}

const verifyRefreshToken = async (req,res,next)=>{
    jwt.verify(req.params.refreshToken, authConfig.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
        const user = await User.findOne({userId : decoded.id});
        if(!user){
            return res.status(400).send({
                message : "The user that this token belongs to does not exist"
            })
        }
        req.user = user;
        next();
    })
}

const validateIdInParams = {
    userInParams,
    theatreInParams,
    movieInParams,
    bookingInParams,
    paymentInParams,
    verifyRefreshToken
}

module.exports = validateIdInParams