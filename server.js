const express = require('express');
const app = express();
<<<<<<< HEAD
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const serverConfig = require('./configs/server.config')
const Movie = require('./models/movie.model');
const constants = require('./utils/constants')
=======
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const init = require('./init')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("#### Error while connecting to mongoDB ####");
});
db.once("open",()=>{
    console.log("#### Connected to mongoDB ####");
    init();
});

require('./routes/movie.routes')(app);


app.listen(serverConfig.PORT,()=>{
    console.log(`#### connected to server at port no.: ${serverConfig.PORT} ####`);
})
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83


/**
 * DB connection
<<<<<<< HEAD
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

        await Movie.collection.drop()
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


=======
 */

/**
 * Initialize the DB with few seed movie data
 */
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83


/**
 * Plug in the routes
<<<<<<< HEAD
*/
require('./routes/movie.routes')(app)
=======
 */
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83


/**
 * Start the server
<<<<<<< HEAD
*/
module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Server is runing ar PORT : " + serverConfig.PORT)
})
=======
 */
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83
