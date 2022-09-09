const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{

        await Movie.collection.drop();
        await Theatre.collection.drop();
        const theatres = [];
        theatres[0] = {
            name : "Theatre 1",
            description : "Description for theatre 1",
            city : "Mumbai",
            pinCode : 400049,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100
        },
        theatres[1] = {
            name : "Theatre 2",
            description : "Description for theatre 2",
            city : "Ahmedabad =",
            pinCode : 380007,
            showTypes : [constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 50
        }

        let theatresCreated =await Theatre.insertMany(theatres);

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
            releaseDate : 2022-10-10,
            releaseStatus : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]

        }

        let moviesCreated = await Movie.insertMany(movies);

        theatresCreated[0].movies.push(moviesCreated[0]._id)
        moviesCreated[0].theatres.push(theatresCreated[0]._id)

        await theatresCreated[0].save()
        await moviesCreated[0].save()
  
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}