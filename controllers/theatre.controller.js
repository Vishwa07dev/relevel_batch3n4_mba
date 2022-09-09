const Theatre = require('../models/theatre.model')
const Movie=require("../models/movie.model")
const mongoose=require("mongoose")

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
exports.getAllMovies=async (req,res)=>{
    try
    {
        const theater=await Theatre.findOne({_id:req.params.id});
        const queryObj={};
        if(theater==null)
        {
            return res.status(500).send({
                message:"Theater Doesn't Exist"
            })
        }
        const movies=theater.movies;
        queryObj["_id"]={$in:movies};
        const move=await Movie.find(queryObj)
        res.status(200).send(move);

        }
    catch(err)
    {
        console.log("#### Error while getting movies ####",err.message);
        res.status(500).send({
            message:"Internal server error while getting movies"
        })
    }
    

}

exports.addMovies=async (req,res)=>{
    try
    {
        const theater=await Theatre.findOne({_id:req.params.id});
    
        if(theater==null)
        {
            return res.status(500).send({
                message:"Theater Doesn't Exist"
            });
        }

        const movie=await Movie.findOne({_id:req.body.id})
     
        if(movie!=null )
        {   
            
        theater.movies.push(movie._id);
        console.log("movies",theater.movies)
        movie.theatres.push(theater._id);
        await theater.save()
        await movie.save();
        }
      
        res.status(200).send(theater);       
    }
    catch(err)
    {
        console.log("Error while adding movie to a theatre")
        res.status(500).send({
            message:"Internal server Error while adding movie to a theatre"
        })
    }
    

}

exports.deleteMovie=async (req,res)=>{
    try
    {

        const theater=await Theatre.findOne({_id:req.params.id});
        await theater.collection.updateMany({_id:theater._id},{$unset:{"movies":""}})
        console.log("#### Movies Delete ####")
        res.status(200).send("Successfully Deleted")
    
    }catch(err)
    {
        console.log("#### error while removing movie ####",err.message)
        res.status(500).send({
            message:"Internal Server Error while removing movie"
        })
    }
}