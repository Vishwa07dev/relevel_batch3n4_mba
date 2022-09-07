const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model');
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{
        await Movie.collection.drop();
        await Theatre.collection.drop();


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
        
        
        const theatre = [];

        theatre[0] = {

            name: "Theatre 1",
            description: "Description for theatre 1",
            city: "Chennai",
            pinCode: 600032,
            showTypes: [constants.theatreShowType.morning, constants.theatreShowType.noon, constants.theatreShowType.evening, constants.theatreShowType.night],
            numberOfSeats: 200
        }

        theatre[1] = {

            name: "Theatre 2",
            description: "Description for theatre 2",
            city: "Bangalore",
            pinCode: 560037 ,
            showTypes: [constants.theatreShowType.noon, constants.theatreShowType.evening, constants.theatreShowType.night],
            numberOfSeats: 200
        }

        theatre[2] = {

            name: "Theatre 3",
            description: "Description for theatre 3",
            city: "Chennai",
            pinCode: 600044 ,
            showTypes: [constants.theatreShowType.evening, constants.theatreShowType.night],
            numberOfSeats: 200
        }

        await Theatre.insertMany(theatre);
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}