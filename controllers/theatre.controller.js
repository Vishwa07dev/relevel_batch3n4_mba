const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model')
const constants = require('../utils/constants')
 
exports.newTheatre = async (req,res)=>{
    try{
        const data = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats
        }
    
        const theatre = await Theatre.create(data);

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

       const updatedTheatre = await Theatre.save();

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

exports.getallMoviesByTheatreId = async (req,res)=>{

    try{
        const theatre = await Theatre.findOne({_id : req.params.id});
        const movieIds = theatre.movies;

        const movies = await Movie.find({_id : movieIds})
        res.status(200).send(movies);
    
    }catch(err){
        console.log("#### Error while getting all movie of that theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the theatre"
        })
    }
 
}

exports.addingAndRemovingMovie = async (req,res)=>{

    try{
        const theatre = await Theatre.findOne({_id : req.params.id});
        const movieIds = req.body.movies;

        if(req.body.operationType == constants.operationType.add){
            
            for(let i=0; i<movieIds.length; i++){
                theatre.movies.push(movieIds[i])
                const movie = await Movie.findOne({_id : movieIds[i]});
                movie.theatres.push(theatre._id);
                await movie.save()
            }

        }else{

            let allMoviesInTheatre = theatre.movies;

            for(let i=0; i<movieIds.length; i++){

                const movie = await Movie.findOne({_id : movieIds[i]});
                let idx = movie.theatres.indexOf(theatre._id);
                movie.theatres.splice(idx, 1);
                await movie.save()

                allMoviesInTheatre = allMoviesInTheatre.filter(elm => {
                    return (!elm.equals(movieIds[i]))
                    
                })
            }
            theatre.movies = allMoviesInTheatre
        }

        await theatre.save()
        res.status(200).send(theatre.movies);
    
    }catch(err){
        console.log("#### Error while getting the theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the theatre"
        })
    }
 
}
