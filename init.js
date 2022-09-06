const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{
        const movies = [];
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
        }
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
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}

module.exports = async ()=>{
    try{
        const theatre = [];
        theatre[0] = {
            name : "PVR",
            description : "Description for PVR",
            city : "Delhi",
            pincode : "110001",
            showTypes : [ "EVENING", "NIGHT"],
            numberOfSeats : "200"
        }
        theatre[1] = {
            name : "INOX Theatre",
            description : "Description for INOX",
            city : "Hyderabad",
            pincode : "540040",
            showTypes : ["NOON",  "EVENING" ,"NIGHT"],
            numberOfSeats : "250"
        }

        await Theatre.insertMany(theatre);
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}