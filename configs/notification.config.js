require('dotenv').config();

module.exports = {
    serviceURL : process.env.NOTIFICATIONSERVICE_URL,
    appURL : process.env.APP_URL
}