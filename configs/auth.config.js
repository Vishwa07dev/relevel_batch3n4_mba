require('dotenv').config();

module.exports = {
    secret : process.env.SECRET,
    JWT_TIME_ACCESS_TOKEN:process.env.JWT_TIME_ACCESS_TOKEN,
    JWT_TIME_REFRESH_TOKEN:process.env.JWT_TIME_REFRESH_TOKEN
}