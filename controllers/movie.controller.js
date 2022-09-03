/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */

 const Movie = require("../models/movie.model");


 exports.addMovie = async (req,res) =>{
 
 
     const movieObj = {
         name: req.body.name,
         description : req.body.description,
         casts : req.body.casts,
         language : req.body.language,
         genre : req.body.genre,
         imdbRating : req.body.imdbRating,
         trailerUrls : req.body.trailerUrls,
         posterUrls :req.body.posterUrls,
         releaseStatus : req.body.releaseStatus,
         releaseDate : req.body.releaseDate
     }
     const movieCreated = await Movie.create(movieObj);
 
     if(!movieCreated){
         res.status(400).send({
             message: "movie doesn't exist"
         })
     }
     res.status(201).send(movieCreated)
 
 }
 
 exports.getAllMovies = async (req,res) =>{
     
     const movies = await Movie.find();
     
     res.status(200).send(movies)
 }
 
 
 exports.getOneMovie = async (req,res) =>{
    
     try{
     const movie = await Movie.findOne({id:req.params.id});
 
     res.status(200).send(movie)
     }catch(err){
        console.log("Some error happened",err.message);
        return res.status(500).send({
            message : "internal server error"
        })
     }
 }
 
 
 exports.updateMovie = async (req,res) =>{
     
     try{
     const movie = await Movie.findOne({id:req.params.id});
     if(!movie){
         res.status(400).send({
             message : "Movie doesn't exist"
         })
     }
     movie.name = req.body.name != undefined ? req.body.name : movie.name;
     movie.description = req.body.description != undefined ? req.body.description : movie.description;
     movie.casts = req.body.casts != undefined ? req.body.casts : movie.casts;
     movie.language = req.body.language != undefined ? req.body.language : movie.language;
     movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate;
     movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus;
     
     const updatedMovie = await movie.save();
 
     res.status(200).send(updatedMovie)
 }catch(err){
     console.log("error while dbOperation",err.message);
     return res.status(500).send({
         message : "Internal server error"
     })
 }
 }
 
 
 exports.delete = async (req,res) =>{
     try{
     const movie = await Movie.deleteOne({id:req.params.id});
     res.status(200).send(movie)
 
     }catch(err){
         console.log("Error while deleting",err.message);
         return res.status(500).send({
             message : "some internal server error"
         })
     }
 }