const Movie=require("../models/movie.model");

const movieValidation=(req,res,next)=>{
    const Body=req.body;
    if(!Body.name || Body.name==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Name is not Provided"
        })
    }
    if(!Body.description ||Body.description==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Description is not Provided"
        })
    }
    if(!Body.casts||Body.casts==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Casts is not Provided"
        })
    }
    if(!Body.trailerUrls ||Body.trailerUrls==" ")
    {
        return res.status(400).send({
            message:"Failed!!! trailerUrls is not Provided"
        })
    }
    if(!Body.posterUrls||Body.posterUrls==" ")
    {
        return res.status(400).send({
            message:"Failed!!! posterUrls is not Provided"
        })
    }
    if(!Body.language||Body.language==" ")
    {
        return res.status(400).send({
            message:"Failed!!! language is not Provided"
        })
    }
    if(!Body.releaseDate||Body.releaseDate==" ")
    {
        return res.status(400).send({
            message:"Failed!!! releaseDate is not Provided"
        })
    }
    if(!Body.releaseStatus||Body.releaseStatus==" ")
    {
        return res.status(400).send({
            message:"Failed!!! releaseStatus is not Provided"
        })
    }
    if(!Body.imdbRating||Body.imdbRating==" ")
    {
        return res.status(400).send({
            message:"Failed!!! imdbRating is not Provided"
        })
    }
    if(!Body.genre||Body.genre==" ")
    {
        return res.status(400).send({
            message:"Failed!!! genre is not Provided"
        })
    }
    next();
}

const isvalidMovie=async (req,res,next)=>{
    
        const movie=await Movie.findOne({name:req.body.name});
    
        if(movie!=null)
        {
        
            return res.status(400).send({
                message:"Failed!!! Movie already Exist"
            })
        }
        
        next();
    }


const ismovieExist=async (req,res,next)=>{
    try
    {
        const movie=await Movie.findOne({_id:req.params.id});
        if(!movie)
        {
             return res.status(403).send({
                message:"Failed!!! Movie Doesn't Exist"
            })
        }
        next();
    }catch(err)
    {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }
    
    
}

const isValid={
    movieValidation,
    isvalidMovie,
    ismovieExist
}

module.exports=isValid