const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const Movie = require("./models/movie.model");
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * DB connection
 */
mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});
/**
 * Initialize the DB with few seed movie data
 */
async function init() {
  try {
    await Movie.collection.drop();

    let movieObj = {
      name: "Liger",
      description:
        "The journey of Liger, from Karimnagar to Mumbai, from a nobody to a competitor, in his search for recognition while navigating his weaknesses, relationships, and love life.",
      casts: [
        "Vijay Deverakonda",
        "Ananya Panday",
        "Ronit Roy",
        "Ramya Krishnan",
        "Mike Tyson",
      ],
      trailerUrls: [
        "https://domainName/resource",
        "https://domainName/resource2",
      ],
      posterUrls: [
        "https://domainName/resource",
        "https://domainName/resource2",
      ],
      language: ["Hindi", "Telugu"],
      releaseDate: "2022-08-25",
      releaseStatus: "RELEASED",
      genre: ["ACTION", "ROMANTIC", "DRAMA"],
      imdbRating: 3.1,
    };
    const movie = await Movie.create(movieObj);
    console.log("Movie created.", movie);
  } catch (err) {
    console.log("err in db initialization , " + err);
  }
}

/**
 * Plug in the routes
 */
require("./routes/movie.routes")(app);

//in case of endpoint ,not exists, send the 404 response
app.use((req, res) => {
  res.status(404).json({
    message: "The requested endpoint doesn't exists.",
  });
});

/**
 * Start the server
 */

app.listen(serverConfig.PORT, () => {
  console.log(`App started listening on port ${serverConfig.PORT}`);
});
