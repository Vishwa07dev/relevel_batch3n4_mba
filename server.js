
const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const dbConfig=require("./configs/db.configs")
const serverConfig=require("./configs/server.configs")
const Movie=require("./models/movie.model")

/**
 * DB connection
 */
mongoose.connect(dbConfig.DB)
const db=mongoose.connection
db.on("err",()=>{
    console.log("error while connecting to DB")
})
db.once("open",()=>{
    console.log("Connected....")
    init()
})
/**
 * Initialize the DB with few seed movie data
 */
    async function init()
    {
        try{
            await Movie.collection.drop();
            const movie=await Movie.create({
                name:"titanic",
                description:"rewrwe",
                casts:"Leo,Monica",
                trailerUrls:"trail",
                posterUrls:"posts",
                language:"English",
                releaseStatus:"COMING_SOON",
                imdbRating:9.02,
                genre:["COMEDY","DRAMA","SCIFI"]
            })

            console.log(movie)
        }catch(err)
        {
            console.log("Error",err.message)
        }
    }

/**
 * Plug in the routes
 */


/**
 * Start the server
 */
require("./routes/movie.routes")(app)
app.listen(serverConfig.PORT,()=>{
    console.log("Connected At Port:",serverConfig.PORT)
})