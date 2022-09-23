require('dotenv').config();

module.exports = {
    secret : process.env.SECRET,
    refreshToken:process.env.REFRESH_TOKEN_SECRET
}