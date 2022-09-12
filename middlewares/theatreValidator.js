const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const validateTheatreRequestBody = async (req, res, next)=>{
    try{
        
        if(!req.body.name){
            res.status(400).send({
                message : "Theatre name is not provided !"
            });
            return;
        }
        
        const theatre = await Theatre.findOne({name : req.body.name});
        
        if(theatre != null){
            res.status(400).send({
                message : "name is already taken !"
            });
            return;
        }

        if(!req.body.description){
            res.status(400).send({
                message : "Theatre description is not provided !"
            });
            return;
        }

        
        if(!req.body.city){
            res.status(400).send({
                message : "Theatre city is not provided !"
            });
            return;
        }

        
        if(!req.body.pinCode){
            res.status(400).send({
                message : "Theatre pinCode is not provided !"
            });
            return;
        }

        if(!req.body.numberOfSeats){
            res.status(400).send({
                message : "Theatre numberOfSeats is not provided !"
            });
            return;
        }
        next();

    }catch(err){
        console.log("Some Error while Validating the theatre's Body", err.message);
        res.status(500).send({
            message : "Some Internal Error !"
        })
    }
}
const isValidTheatre = async (req, res, next)=>{
    try{
        const theatre = await Theatre.findById(req.params.id);
        if(theatre == null){
            res.status(400).send({
                message : "Theatre is not exist !"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Some Error while the Validating Theatre Id", err.message)
    }
}

const isValidTheatreList = async (req, res, next) =>{
    try{
        if(req.body.addMovies){
            addMovies.forEach( async(movieId) =>{
                const movie = await Movie.findById(movieId);
                if(!movie){
                    res.status(404).send({
                        message: `${movieId} Movie is not exist`,
                    });
                    return;
                }
            });
        }

        if(req.body.removeMovies){
            removeMovies.forEach( async(movieId) =>{
                const movie = await Movie.findById(movieId);
                if(!movie){
                    res.status(404).send({
                        message: `${movieId} Movie is not exist`,
                    });
                    return;
                }
            });
        }
        
        next();
    }catch(err){
        console.log("Some Error while Checking the List", err.message);
        res.status(500).send({
            message: "Some Internal Error !"
        });
    }



}

const theatreValidator = {
    validateTheatreRequestBody,
    isValidTheatre,
    isValidTheatreList
};
module.exports = theatreValidator;