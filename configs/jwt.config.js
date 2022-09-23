require('dotenv').config();

module.exports = {
    jwt_time : process.env.JWT_TIME,
    jwt_refresh_time : process.env.JWT_REFRESH_TIME
}