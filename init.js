const bcrypt = require("bcryptjs");

const Movie = require('./models/movie.model')
const User = require('./models/user.model')
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
        
        const users = [];
        users[0] = {
            name: 'user',
            userId : 'userId',
            email : 'email@gmail.com',
            userType : 'ADMIN',
            password: bcrypt.hashSync("password",10),
            userStatus : 'APPROVED'
        }
        users[1] = {
            name: 'user1',
            userId : 'userId1',
            email : 'email1@gmail.com',
            userType : 'CUSTOMER',
            password: bcrypt.hashSync("password",10),
            userStatus : 'APPROVED'
        }
        users[2] = {
            name: 'user2',
            userId : 'userId2',
            email : 'email2@gmail.com',
            userType : 'THEATRE OWNER',
            password: bcrypt.hashSync("password",10),
            userStatus : 'PENDING'
        }

        await Movie.insertMany(movies);
        await User.insertMany(users);
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}