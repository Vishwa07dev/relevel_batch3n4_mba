if(process.env.NODE_ENV != "PRODUCTION"){
    require('dotenv').config();
}

module.exports = {
    PORT : process.env.PORT
}