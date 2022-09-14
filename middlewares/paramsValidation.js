const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')

const userParams = async (req,res,next)=>{

    try{

        const user = await User.findOne({userId : req.params.id});

        if(!user){
            return res.status(400).send({
                message : "userId passed dosen't exist"
            })
        }
        req.userParams = user;
        next();

    }catch(err){
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message : "Internal server error ..."
        })
    }
}

const theatreParams = async (req,res,next)=>{

    try{

        const theatre = await Theatre.findOne({_id : req.params.id});

        if(!theatre){
            return res.status(400).send({
                message : "Theatre Id passed dosen't exist"
            })
        }
        req.theatreParams = theatre;
        next();

    }catch(err){
        console.log("Error while reading the theatre info", err.message);
        return res.status(500).send({
            message : "Internal server error .."
        })
    }
}

const movieParams = async (req,res,next)=>{

    try{

        const movie = await Movie.findOne({_id : req.params.id});

        if(!movie){
            return res.status(400).send({
                message : "Movie Id passed dosen't exist"
            })
        }
        req.movieParams = movie;
        next();

    }catch(err){
        console.log("Error while reading the movie info", err.message);
        return res.status(500).send({
            message : "Internal server error .."
        })
    }
}

const validationOfParams = {
    userParams,
    theatreParams,
    movieParams
}

module.exports = validationOfParams;