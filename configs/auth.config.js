require('dotenv').config();

module.exports = {
    secret : process.env.SECRET,
    tokenHeader : process.env.TOKEN_HEADER
}