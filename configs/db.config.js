if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
module.exports = {
    DB_URL : process.env.DB_URL
}