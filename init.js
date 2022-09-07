const Movie = require('./models/movie.model');
const Theatre = require('./models/theatre.model');
const constants = require('./utils/constants');

module.exports = async ()=>{

    await Movie.collection.drop();
    await Theatre.collection.drop();

    try{
        const movies = [];
        const theatres = [];
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
        movies[2] = {
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
        movies[3] = {
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

        theatres[0] = {
            name : "PGR",
            description : "Enjoy the show...!",
            city : "Bangalore",
            pinCode : 517567,
            showTypes : [constants.showTypes.morning, constants.showTypes.noon, constants.showTypes.evening, constants.showTypes.night],
            numberOfSeats : 125
        },
        theatres[1] = {
            name : "PGR-2",
            description : "Enjoy the show...!",
            city : "Bangalore",
            pinCode : 517566,
            showTypes : [constants.showTypes.morning, constants.showTypes.noon, constants.showTypes.evening, constants.showTypes.night],
            numberOfSeats : 125
        }

        await Theatre.insertMany(theatres)
        await Movie.insertMany(movies);
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}