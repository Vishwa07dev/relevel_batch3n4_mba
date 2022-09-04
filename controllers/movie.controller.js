/**
 * This file should have the controller methods to perform crud on
 * the movie resource
 */
const Movie=require("../models/movie.model")
const objectConverter=require("../utils/objectConverter")
exports.movieCreated=async (req,res)=>{
    const Body=req.body;
    const movieObj={
        name:Body.name,
        description:Body.description,
        cast:Body.cast,
        trailerUrls:Body.trailerUrls,
        posterUrls:Body.posterUrls,
        language:Body.language,
        releaseDate:Body.releaseDate,
        releaseStatus:Body.releaseStatus,
        imdbRating:Body.imdbRating,
        genre:Body.genre
    }

    try{

        const newMoview=await Movie.create(movieObj)
        res.status(201).send(newMoview)
    }catch(err)
    {
        console.log("error while creating movie",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        });
    }
}

exports.movieUpdate=async (req,res)=>{

    try{
            const Body=req.body;
            const movie=await Movie.findOne({_id:req.params.id})
            
                movie.name=Body.name!=undefined?Body.name:movie.name;
                movie.description=Body.description!=undefined?Body.description:movie.description;
                movie.casts=Body.casts!=undefined?Body.casts:movie.casts;
                movie.trailerUrls=Body.trailerUrls!=undefined?Body.undefined:movie.trailerUrls;
                movie.posterUrls=Body.posterUrls!=undefined?Body.posterUrls:movie.posterUrls;
                movie.language=Body.language!=undefined?Body.language:movie.language;
                movie.releaseDate=Body.releaseDate!=undefined?Body.releaseDate:movie.releaseDate;
                movie.releaseStatus=Body.releaseStatus!=undefined?Body.releaseStatus:movie.releaseStatus;
                movie.imdbRating=Body.imdbRating!=undefined?Body.imdbRating:movie.imdbRating;
                movie.genre=Body.genre!=undefined?Body.genre:movie.genre;
                const updateMovie=movie.save()
    
            res.status(200).send({
                name:movie.name,
                description:movie.description,
                casts:movie.casts,
                trailerUrls:movie.trailerUrls,
                posterUrls:movie.posterUrls,
                language:movie.language,
                releaseDate:movie.releaseDate,
                imdbRating:movie.imdbRating,
                genre:movie.genre
            })
    }
    catch(err)
    {
        console.log("Error while Updating Movie",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })  
    }
}


exports.getMovie=async (req,res)=>{    
    try
    {
        const movies=await Movie.findOne({_id:req.params.id})
        return res.status(200).send(movies)  
    }
    catch(err)
    {
        console.log("Error while getting Movie",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}
exports.getAllMovies=async(req,res)=>{
   
    const queryObj={}
    const releaseStatusQP=req.query.releaseStatus;
    const nameQP=req.query.name;
    const genreQP=req.query.genre;
    if(releaseStatusQP)
    {
        queryObj.releaseStatus=releaseStatusQP;
    }
    if(nameQP)
    {
        queryObj.name=nameQP;
    }
    if(genreQP)
    {
        queryObj.genre=genreQP
    }
    try
    {
        const movies=await Movie.find(queryObj);
        res.status(200).send(objectConverter.movieResponse(movies))
    }catch(err)
    {
        console.log("Error while getting all Movies",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.deleteMovie=async (req,res)=>{
    try
    {
    const movie=await Movie.deleteOne({_id:req.params.id});
    res.status(200).send({
        message:"Succesfully Deleted..."
    })
    }catch(err)
    {
        console.log("Error While Deleting",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}