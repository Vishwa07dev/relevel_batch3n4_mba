const express = require('express');
const mongoose = require("mongoose");

const serverConfig = require('./config/server.config');
const dbConfig = require("./config/db.config");

const app = express();

app.use(express.json());

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", async () => {
    console.log("Connected to mongoDB");
});

const PORT = serverConfig.PORT || 8080;

require('./routes/movie.routes')(app)

module.exports = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})