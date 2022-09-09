const Theatre = require('../models/theatre.model')
const Movie = require('../models/movie.model');
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


exports.moviesInTheatre = async (req,res)=>{

    try{
        const theatre = await Theatre.findOne({_id : req.params.id}).populate('movies');
        console.log(theatre);
        res.status(200).send(theatre.movies);
    
    }catch(err){
        console.log("#### Error while getting the theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the theatre"
        })
    }
 
 }

 exports.modifiyTheatre = async (req,res)=>{

    try{
        const theatre = await Theatre.findOne({_id : req.params.id});
        
        if(req.body.addMovies){
            req.body.addMovies.forEach(movie => {
                theatre.movies.push(movie)
            });
            req.body.addMovies.forEach(async movie=>{
                const singleMovie = await Movie.findById(movie);
                if(singleMovie != null){
                    singleMovie.theatres.push(theatre._id);
                    singleMovie.save();
                }
            })
            
        }

        if(req.body.removeMovies){
            req.body.removeMovies.forEach(movie => {
                theatre.movies.remove(movie)
            })
            req.body.removeMovies.forEach(async movie=>{
                const singleMovie = await Movie.findById(movie);
                if(singleMovie != null){
                    singleMovie.theatres.remove(theatre._id);
                    singleMovie.save();
                }
            })
        }

        await theatre.save();
        res.status(201).send({message : "Updated movies in theatre"});

    
    }catch(err){
        console.log("#### Error while performing movie on theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the theatre"
        })
    }
 
 }