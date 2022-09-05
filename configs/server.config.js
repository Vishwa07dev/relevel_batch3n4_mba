<<<<<<< HEAD


if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL
=======
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


module.exports = {
    PORT : process.env.PORT
>>>>>>> cb53a3b79209cb6de8b8b437a7d21fe45608ab83
}