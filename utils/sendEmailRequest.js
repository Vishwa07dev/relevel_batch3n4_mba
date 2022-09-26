const sendEmail = require('./notificationClient')
const notificationConfig = require('../configs/notification.config')

exports.sucessfulTicketPayment = (userEmail, payment)=>{
    sendEmail(
    `Movie booking payment successful`,
    `The payment of your movie booking for amount ${payment.amount} has been successful`,
    `${userEmail}`,
    "Movie Booking App"
    );
}

exports.failedTicketPayment = (userEmail, payment)=>{
    sendEmail(
    `Movie booking payment failed`,
    `The payment of your movie booking for amount ${payment.amount} has failed. Please create a new booking from ${notificationConfig.appURL}/mba/api/v1/bookings`,
    `${userEmail}`,
    "Movie Booking App"
    );
}

exports.bookingCancelled = (userEmail)=>{
    sendEmail(
    `Movie booking canclled`,
    `Your booking has been cancelled at your request. If you wish to create a new booking, please visit ${notificationConfig.appURL}/mba/api/v1/bookings`,
    `${userEmail}`,
    "Movie Booking App"
    );
}

exports.bookingPaymentTimedOut = (userEmail)=>{
    sendEmail(
    `Movie booking payment timed out`,
    `Your booking has been cancelled because you were not able to complete the payment on time. You can create a new booking from ${notificationConfig.appURL}/mba/api/v1/bookings`,
    `${userEmail}`,
    "Movie Booking App"
    );
}
