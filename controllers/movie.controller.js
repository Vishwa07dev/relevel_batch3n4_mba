<<<<<<< HEAD
/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */
const Movie=require("../models/movie.model")
const constants=require("../Utils/movie.utils")

exports.create=async(req,res)=>{
    try{
        const movieObj={
            name:req.body.name,
            description:req.body.description,
            casts:req.body.casts,
            trailerUrls:req.body.trailerUrls,
            posterUrls:req.body.posterUrls,
            language:req.body.language,
            releaseDate:req.body.releaseDate,
            releaseStatus:req.body.releaseStatus,
            imdbRating:req.body.imdbRating,
            genre:req.body.genre
        }
        const movie=await Movie.create(movieObj)
        console.log(movie)
        res.status(201).send(movie)
    }
    catch(err){
        console.log("controller/movie/create",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.update=async(req,res)=>{
    try{
        const movie=await Movie.findOne({_id:req.params.id})

        movie.name=req.body.name!==undefined ? req.body.name:movie.name
        movie.description=req.body.description!==undefined? req.body.description:movie.description
        movie.casts=req.body.casts!==undefined? req.body.casts:movie.casts
        movie.trailerUrls=req.body.trailerUrls!==undefined? req.body.trailerUrls:movie.trailerUrls
        movie.posterUrls=req.body.posterUrls!==undefined? req.body.posterUrls:movie.posterUrls
        movie.language=req.body.language!==undefined? req.body.language:movie.language
        movie.releaseDate=req.body.releaseDate!==undefined? req.body.releaseDate:movie.releaseDate
        movie.releaseStatus=req.body.releaseStatus!==undefined? req.body.releaseStatus:movie.releaseStatus
        movie.imdbRating=req.body.imdbRating!==undefined? req.body.imdbRating:movie.imdbRating
        movie.genre=req.body.genre!==undefined? req.body.genre:movie.genre

        await movie.save()
        res.status(201).send(movie)
    }
    catch(err){
        console.log("controller/movie/update",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.delete=async(req,res)=>{
    try{
        const movie=await Movie.findOne({_id:req.params.id})
    
        await movie.delete()
        res.status(200).send("Movie Deleted")
    }
    catch(err){
        console.log("controller/movie/delete",err)
        res.status(500).send("There was an error from our side ")
        }
}

exports.getMovieById=async(req,res)=>{
    try{
        const movie=await Movie.findOne({_id:req.params.id})

        res.status(200).send(movie)
    }
    catch(err){
        console.log("controller/movie/getMovieById",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.getAllMovie=async(req,res)=>{
    try{
        const movies=await Movie.find()
        res.status(200).send(movies)
    }
    catch(err){
        console.log("controller/movie/getallmovies",err)
        res.status(500).send("There was an error from our side")
    }
}
=======
 const Movie = require('../models/movie.model')
 
 exports.NewMovie = async (req,res)=>{
     try{
         const data = {
             name : req.body.name,
             description : req.body.description,
             casts : req.body.casts,
             trailerUrls : req.body.trailerUrls,
             posterUrls : req.body.posterUrls,
             languages : req.body.languages,
             releaseDate : req.body.releaseDate,
             releaseStatus : req.body.releaseStatus,
             imdbRating : req.body.imdbRating,
             genre : req.body.genre
         }
     
         const movie = await Movie.create(data);

         console.log(`#### New Movie '${movie.name}' created ####`);
         res.status(201).send(movie);

 
        }catch(err){
         console.log("#### Error while creating new movie #### ", err);
         res.status(500).send({
             message : "Internal server error while creating new movie"
         });
     }
 }

 
exports.editMovie = async (req,res)=>{
    try{
        const movie = await Movie.findOne({_id : req.params.id});

        movie.name = req.body.name ? req.body.name : movie.name,
        movie.description = req.body.description ? req.body.description : movie.description,
        movie.casts = req.body.casts ? req.body.casts : movie.casts,
        movie.trailerUrls = req.body.trailerUrls ? req.body.trailerUrls : movie.trailerUrls,
        movie.posterUrls = req.body.posterUrls ? req.body.posterUrls : movie.posterUrls,
        movie.languages = req.body.languages ? req.body.languages : movie.languages,
        movie.releaseDate = req.body.releaseDate ? req.body.releaseDate : movie.releaseDate,
        movie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : movie.releaseStatus,
        movie.imdbRating = req.body.imdbRating ? req.body.imdbRating : movie.imdbRating,
        movie.genre = req.body.genre ? req.body.genre : movie.genre

        const updatedMovie = await movie.save();

        console.log(`#### Movie data updated ####`);
        res.status(200).send(updatedMovie);

    }catch(err){
        console.log("#### Error while updating movie data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating movie data"
        });
    }
}

exports.deleteMovie = async (req,res)=>{
    try{
        const movie = await Movie.findOne({_id : req.params.id});

        await movie.remove();

        console.log(`#### Movie deleted ####`);
        res.status(200).send({message : "Movie deleted"});

    }catch(err){
        console.log("#### Error while deleting movie #### ", err.message);
        res.status(500).send({
            message : "Internal server error while deleting movie"
        });
    }
}


exports.getAllMovies = async (req,res)=>{
    try{
        const movies = await Movie.find();
    
        res.status(200).send(movies);
    
    }catch(err){
        console.log("#### Error while getting all movies ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting all movies"
        })
    }
}

exports.getSingleMovie = async (req,res)=>{

    try{
        const movie = await Movie.findOne({_id : req.params.id});
    
        res.status(200).send(movie);
    
    }catch(err){
        console.log("#### Error while getting the movie ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the movie"
        })
    }

}
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d
