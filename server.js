const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config")


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


/**
* DB connection
*/
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("Error",()=>{
    console.log("Error while initialization of db",err.message)
});
db.once("open",()=>{
    console.log("mongodb is connected")
    init();
})


/**
* Initialize the DB with few seed movie data
*/

const Movie = require('./models/movie.model')
async function init(){

    try{
    await Movie.collection.drop()

    const movie = await Movie.create({
        name : "Avatar2 the way of water",
        description : "it is second part of of avatar1 and things will continue from there ",
        casts :["Sam Worthington as Jake Sully","Zoe Saldana as Neytiri","Sigourney Weaver as Kiri"],
        language : "english",
        imdbRating : 9,
        genre : ["FANTASY","ADVENTURE","ACTION","SCI-FI"],
        trailerUrls : ["https://youtu.be/NZrX_ES93JA","https://youtu.be/rSiZGsyClUc"],
        posterUrls :["https://images.app.goo.gl/rjwjyrH852Ex8iFW7","https://images.app.goo.gl/euGmNPPtofra4Wmk8"],
        releaseDate : 2022-09-16,
        releaseStatus : "COMING_SOON",
    })
    
    console.log(movie)
    
}catch(err){
    console.log("Error in db initialization",err.message)
}

}


/**
* Plug in the routes
*/
require("./routes/movie.routes")(app)


/**
* Start the server
*/
app.listen(serverConfig.PORT, ()=>{

    console.log("Server started at port number :",serverConfig.PORT)
})
