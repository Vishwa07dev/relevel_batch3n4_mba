const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model')
const constants = require('../utils/constants')
 
exports.createNewTheatre = async (req,res)=>{
    try{
        const data = {
            ownerId : req.user.userType == constants.userTypes.admin ? req.body.ownerId : req.user._id,
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats
        }
    
        const theatre = await Theatre.create(data);
        const theatreOwner = await User.findOne({_id : theatre.ownerId});
        theatreOwner.theatresOwned.push(theatre._id);
        await theatreOwner.save();

        console.log(`#### New theatre '${theatre.name}' created ####`);
        res.status(201).send(theatre);


       }catch(err){
        console.log("#### Error while creating new theatre #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new theatre"
        });
    }
}


exports.editTheatre = async (req,res)=>{
   try{
       const theatre = await Theatre.findOne({_id : req.params.id});

       theatre.name = req.body.name ? req.body.name : theatre.name,
       theatre.description = req.body.description ? req.body.description : theatre.description,
       theatre.city = req.body.city ? req.body.city : theatre.city,
       theatre.pinCode = req.body.pinCode ? req.body.pinCode : theatre.pinCode,
       theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes,
       theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats

       const updatedTheatre = await theatre.save();

       console.log(`#### Theatre data updated ####`);
       res.status(200).send(updatedTheatre);

   }catch(err){
       console.log("#### Error while updating theatre data #### ", err.message);
       res.status(500).send({
           message : "Internal server error while updating theatre data"
       });
   }
}

exports.deleteTheatre = async (req,res)=>{
   try{
       const theatre = await Theatre.findOne({_id : req.params.id});
       const theatreOwner = await User.findOne({_id : theatre.ownerId});
       await theatreOwner.theatresOwned.remove(theatre._id);
       await theatreOwner.save();

       await theatre.remove();

       console.log(`#### Theatre deleted ####`);
       res.status(200).send({message : "Theatre deleted"});

   }catch(err){
       console.log("#### Error while deleting theatre #### ", err.message);
       res.status(500).send({
           message : "Internal server error while deleting theatre"
       });
   }
}


exports.getAllTheatres = async (req,res)=>{
   try{
       const theatres = await Theatre.find();
   
       res.status(200).send(theatres);
   
   }catch(err){
       console.log("#### Error while getting all theatres ####", err.message);
       res.status(500).send({
           message : "Internal server error while getting all theatres"
       })
   }
}

exports.getSingleTheatre = async (req,res)=>{

   try{
       const theatre = await Theatre.findOne({_id : req.params.id});
   
       res.status(200).send(theatre);
   
   }catch(err){
       console.log("#### Error while getting the theatre ####", err.message);
       res.status(500).send({
           message : "Internal server error while getting the theatre"
       })
   }

}

exports.getMoviesInTheatre = async (req,res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        const movies = await Movie.find({_id : theatre.movies})
    
        res.status(200).send(movies);
    
    }catch(err){
        console.log("#### Error while getting the movies in theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the movies in theatre"
        })
    }
 }

 exports.editMoviesInTheatre = async (req,res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        if(req.body.addMovies){
            req.body.addMovies.forEach(movie => {
                theatre.movies.push(movie)
            })
            req.body.addMovies.forEach(async (movie) =>{
                let temp = await Movie.findOne({_id : movie})
                temp.theatres.push(theatre._id);
                await temp.save();
            })
    }

        if(req.body.removeMovies){
            req.body.removeMovies.forEach(async (movie) => {
                await theatre.movies.remove(movie)
            })
            req.body.removeMovies.forEach(async (movie) =>{
                let temp = await Movie.findOne({_id : movie})
                await temp.theatres.remove(theatre._id);
                await temp.save();
            })
    }

        await theatre.save();
        res.status(200).send({message : "Updated movies in theatre"});
        
    }catch(err){
        console.log("#### Error while updating the movies in theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while updating the movies in theatre"
        })
    }
 }
 