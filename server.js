const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Movie = require('./models/movie.model');
const dbConfig = require('./config/db.config');
const serverConfig = require('./config/server.config');
const {gerne ,releaseStatus} = require('./utils/constant')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


/**
 * DB connection
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error while connecting to MongoDB");
});
db.once("open", ()=>{
    console.log("Connected to mongoDB");
    init();
});

/**
 * Initialize the DB with few seed movie data
 */
async function init(){
    try{
        await Movie.collection.drop();

        let movieObj = {
            name : "Forest Gump",
            description : "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
            casts : ["Tom hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
            trailerUrls : ["https://youtu.be/bLvqoHBptjg"],
            posterUrls : ["https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i"],
            language : "English , hindi",
            releaseDate : "06 july 1994",
            releaseStatus : releaseStatus.released,
            imdbRating : 8.8,
            genre : [gerne.comedy, gerne.romance]
        }
        const movieCreated = await Movie.create(movieObj);
        console.log(movieCreated);


    }catch(err){
        console.log("Error while stroing the raw data ",err.message);
    }
}

/**
 * Plug in the routes
 */
require('./routes/movie.routes')(app);

/**
 * Start the server
 */
app.listen(serverConfig.PORT, ()=>{
    console.log(`Server is Stated at Port ${serverConfig.PORT}`);
})