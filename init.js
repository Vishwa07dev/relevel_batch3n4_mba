const Movie = require('./models/movie.model')
const constants = require('./utils/constants')
const Theatre=require("./models/theatre.model")
module.exports = async ()=>{
    try{
        await Movie.collection.drop();
        await Theatre.collection.drop();
        const movies = [];
        const theather=[];
        theather[0]={
            name:"PVPMovies",
            description:"dsadsa",
            city:"Mumbai",
            pinCode:400095,
            showTypes:"MORNING",
            numberOfSeats:400
        },
        theather[1]={
            name:"Cinimex",
            description:"dsadsa",
            city:"Mumbai",
            pinCode:400095,
            showTypes:"NOON",
            numberOfSeats:300
        }
        movies[0] = {
            name : "Movie 1",
            description : "Description for movie 1",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-10-10,
            releaseStatus : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[0] = {
        name : "Movie 1",
        description : "Description for movie 1",
        casts : ["SomeOne", "SomeOneElse"],
        trailerUrls : ["TrailerURL"],
        posterUrls : ["PosterURL"],
        languages : ["English","Hindi"],
        releaseDate : 2022-10-10,
        releaseStatus : constants.movieReleaseStatuses.coming_soon,
        imdbRating : 8.5,
        genre : [constants.movieGenre.action]
        },
        movies[1] = {
            name : "Movie 2",
            description : "Description for movie 2",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-09-09,
            releaseStatus : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[2] = {
        name : "Movie 3",
        description : "Description for movie 3",
        casts : ["SomeOne", "SomeOneElse"],
        trailerUrls : ["TrailerURL"],
        posterUrls : ["PosterURL"],
        languages : ["English","Hindi"],
        releaseDate : 2022-12-12,
        releaseStatus : constants.movieReleaseStatuses.coming_soon,
        imdbRating : 8.5,
        genre : [constants.movieGenre.action]
        }

        await Movie.insertMany(movies);
        await Theatre.insertMany(theather);
        console.log(theather)
        // console.log(movies)
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}