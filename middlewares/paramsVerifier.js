const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')

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

const validateIdInParams = {
    userInParams,
    theatreInParams,
    movieInParams
}

module.exports = validateIdInParams