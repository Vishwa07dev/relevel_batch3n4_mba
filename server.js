const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./configs/db.config')
const bodyParser = require('body-parser');
const serverConfig = require('./configs/server.config');
const constanst = require('./utils/constants');
const Movie = require('./models/movie.model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * DB connection
 */
mongoose.connect(dbConfig.DB_URL, async()=>{
    console.log("Connected to mongo database.")
    init();
}),("err", () =>{
    console.log("Error in connecting to mongoDB", err)
})

/**
 * Initialize the DB with few seed movie data
 */
async function init(){

    try{

        await Movie.collection.drop();

        const movieObj = {
            name : "Avatar: The Way of Water ",
            description : "Story of Jack Sally who lived on alien plant Na'vi and protects it.",
            casts : [ "Michelle Yeoh", "Zoe Saldana", "Kate Winslet", "Sigourney Weaver"],
            trailerUrls : ["https://www.youtube.com/watch?v=bS2Uh0B6bqg"],
            posterUrls : ["https://www.imdb.com/title/tt1630029/mediaviewer/rm1900810753/?ref_=tt_ov_i"],
            language : "English",
            releaseDate : "December 16, 2022",
            releaseStatus : "COMING_SOON",
            genre : constanst.genre.scifi
        }
    
        const movie = await Movie.create(movieObj);
        console.log(movie);
    }
    catch(err){
        console.log("Error in DB initilization", err.message)
    }
}


/**
 * Plug in the routes
 */
require("./routes/movie.routes")(app);


/**
 * Start the server
 */

app.listen(serverConfig.PORT, () =>{
console.log("Server has started on port number: ", serverConfig.PORT)
})


