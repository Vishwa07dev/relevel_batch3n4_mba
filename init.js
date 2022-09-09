const bcrypt = require("bcryptjs");

const Movie = require('./models/movie.model')
const User = require('./models/user.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{

        await Movie.collection.drop();
        console.log("#### Movie collection dropped ####");
        await Theatre.collection.drop();
        console.log("#### Theatre collection dropped ####");
        await User.collection.drop();
        console.log("#### User collection dropped ####");

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

        theatresCreated = await Theatre.insertMany(theatres);

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
        
        const users = [];
        users[0] = {
            name: 'user',
            userId : 'userId',
            email : 'email@gmail.com',
            userType : constants.userTypes.admin,
            password: bcrypt.hashSync("password",10),
            userStatus : constants.status.approved
        }
        users[1] = {
            name: 'user1',
            userId : 'userId1',
            email : 'email1@gmail.com',
            userType : constants.userTypes.customer,
            password: bcrypt.hashSync("password",10),
            userStatus : constants.status.approved
        }
        users[2] = {
            name: 'user2',
            userId : 'userId2',
            email : 'email2@gmail.com',
            userType : constants.userTypes.owner,
            password: bcrypt.hashSync("password",10),
            userStatus : constants.status.pending
        }

        await Movie.insertMany(movies);
        await User.insertMany(users);
        moviesCreated = await Movie.insertMany(movies);

        theatresCreated[0].movies.push(moviesCreated[0]._id, moviesCreated[1]._id)
        moviesCreated[0].theatres.push(theatresCreated[0]._id)
        moviesCreated[1].theatres.push(theatresCreated[0]._id)
    
        theatresCreated[0].save()
        moviesCreated[0].save()
        moviesCreated[1].save()

        console.log("#### Seed data initialized ####");
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}