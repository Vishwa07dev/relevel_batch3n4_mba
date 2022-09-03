const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const serverConfig = require('./configs/server.config')
const Movie = require('./models/movie.model');
const constants = require('./utils/constants')


/**
 * DB connection
*/
mongoose.connect(serverConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error While connecting with mongoDB")
})
db.once("open", () => {
    console.log("Connection Established with mongoDB")
    init()
})


/**
 * Initialize the DB with few seed movie data
*/
async function init() {
    try {

        const movieObj = {
            name : "temp Movie",
            description : "hello this a good movie",
            casts : ["somthing"],
            trailerUrls : "abc/def/youtube.com",
            posterUrls : "abc/def/youtube.com",
            language : "Hindi",
            releaseDate : "10-10-2022",
            releaseStatus : constants.releaseStatus.comming_soon,
            imdbRating : 4.5,
            genre : constants.genre.comedy
        }

        const movie = await Movie.create(movieObj);

        console.log(movie);

    } catch (err) {
        console.log("Error while inserting data into database manually : ", err.message)
    }
};




/**
 * Plug in the routes
*/
require('./routes/movie.routes')(app)


/**
 * Start the server
*/
module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Server is runing ar PORT : " + serverConfig.PORT)
})