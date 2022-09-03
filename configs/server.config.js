

if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL
}