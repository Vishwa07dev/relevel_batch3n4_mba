<<<<<<< HEAD
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
=======
const express = require('express');
const app = express();
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


/**
 * DB connection
 */
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d

/**
 * Initialize the DB with few seed movie data
 */


/**
 * Plug in the routes
 */
<<<<<<< HEAD
require("./routes/movie.routes")(app)
=======
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d


/**
 * Start the server
<<<<<<< HEAD
 */
 module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
=======
 */
>>>>>>> 46cbcded36e89cc9e58cc470120d3dceade2294d
