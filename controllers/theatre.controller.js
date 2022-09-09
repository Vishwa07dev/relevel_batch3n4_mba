const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
 
 
exports.createTheatre = async (req,res)=>{
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
        return res.status(201).send(theatre);


       }catch(err){
        console.log("#### Error while creating new theatre #### ", err);
        return res.status(500).send({
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
       return res.status(200).send(updatedTheatre);

   }catch(err){
       console.log("#### Error while updating theatre data #### ", err.message);
       return res.status(500).send({
           message : "Internal server error while updating theatre data"
       });
   }
}

exports.deleteTheatre = async (req,res)=>{
   try{
       const theatre = await Theatre.findOne({_id : req.params.id});

       await theatre.remove();

       console.log(`#### Theatre deleted ####`);
       return res.status(200).send({message : "Theatre deleted"});

   }catch(err){
       console.log("#### Error while deleting theatre #### ", err.message);
       return res.status(500).send({
           message : "Internal server error while deleting theatre"
       });
   }
}


exports.getAllTheatres = async (req,res)=>{
   try{
       const theatres = await Theatre.find();
   
       return res.status(200).send(theatres);
   
   }catch(err){
       console.log("#### Error while getting all theatres ####", err.message);
       return res.status(500).send({
           message : "Internal server error while getting all theatres"
       })
   }
}

exports.getSingleTheatre = async (req,res)=>{

   try{
       const theatre = await Theatre.findOne({_id : req.params.id});
   
       return res.status(200).send(theatre);
   
   }catch(err){
       console.log("#### Error while getting the theatre ####", err.message);
       return res.status(500).send({
           message : "Internal server error while getting the theatre"
       })
   }

}

exports.updateMoviesInTheatre = async (req, res) =>{
    
    try {

        const theatre = await Theatre.findOne({_id : req.params.id});

        if(req.body.addMovies && req.body.addMovies.length > 0){

            req.body.addMovies.forEach(async movie => {
                
                theatre.movies.push(movie);
                const moviee = await Movie.find({_id : movie});
                moviee.theatres.push(theatre._id);
                await moviee.save();
            })
        }

        if(req.body.delMovies && req.body.delMovies.length > 0){
            for(let movieObjId of req.body.delMovies){

                let index = theatre.movies.indexOf(movieObjId);
                theatre.movies.splice(index, 1);

                const movie = await Movie.find({_id : movieObjId});
                index = movie.theatres.indexOf(theatre._id);
                movie.theatres.splice(index, 1);
                await movie.save();
            }

        }


        const updatedTheatre = await theatre.save();

        return res.status(200).send(updatedTheatre);

    }catch(err){
        console.log("#### Error while updating the movies in the theatre ####", err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }

}

exports.getAllMoviesInTheatre = async (req, res) =>{
    
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});

        const movies = await Movie.find({'_id' : { $in : theatre.movies }});

        if(movies.length <1){
            return res.status(200).send({
                message : "No movies yet"
            });
        }else {
            return res.status(200).send(movies);
        }

    }catch(err){
        console.log("#### Error while getting the movies in the theatre ####", err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }

}