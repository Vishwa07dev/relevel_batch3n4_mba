const express = require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser = require("body-parser")
const serverConfig=require("./Config/server.config")
const dbConfig = require("./Config/db.config")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * DB connection
 */
 mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    init();
});
async function init(){
    try{
        await db.db.dropCollection("movies")
    }
    catch(err){
        console.log(err)
    }
}

/**
 * Initialize the DB with few seed movie data
 */


/**
 * Plug in the routes
 */
require("./routes/movie.routes")(app)


/**
 * Start the server
 */
 module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});