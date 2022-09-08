const mongoose  = require('mongoose')
const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{

        await Movie.collection.drop();
        await Theatre.collection.drop()

        const theatres = [];
        theatres[0] = {
            name : "Theatre 1",
            description : "Description for theatre 1",
            city : "Mumbai",
            pinCode : 400049,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100,
        },
        theatres[1] = {
            name : "Theatre 2",
            description : "Description for theatre 2",
            city : "Ahmedabad =",
            pinCode : 380007,
            showTypes : [constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 50,
        },
        theatres[2] = {
            name : "Theatre 3",
            description : "Description for theatre 3",
            city : "New Delhi",
            pinCode : 110031,
            showTypes : [constants.theatreShows.evening],
            numberOfSeats : 75,
        }

        await Theatre.insertMany(theatres);

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

        // Adding all movieId into theatre(circularly)
        function getMin(arr, min = Infinity, minIdx = -1){
            for(let i=0; i<arr.length; i++){
                if(arr[i].movies.length < min){
                    min = arr[i].movies.length;
                    minIdx = i
                }
            }
            return minIdx
        }

        const allMovies = await Movie.find();
        const allTheatre = await Theatre.find();

        allMovies.forEach(async (movie) => {
            let minIdx = getMin(allTheatre)
            allTheatre[minIdx].movies.push(movie._id)
            await allTheatre[minIdx].save()
        })

    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}