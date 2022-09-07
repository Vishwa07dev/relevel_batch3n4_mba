const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const init = require('./init')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/*
 * DB connection
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("err", ()=>{
    console.log("#### Error while connecting to mongoDB ####");
});
db.once("open",()=>{
    console.log("#### Connected to mongoDB ####");
    /*
     * Initialize the DB with few seed movie and theather data
     */
    init();
});


/*
 * Plug in the routes
 */
require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);


/*
 * Start the server
 */
app.listen(serverConfig.PORT,()=>{
    console.log(`#### connected to server at port no.: ${serverConfig.PORT} ####`);
})








