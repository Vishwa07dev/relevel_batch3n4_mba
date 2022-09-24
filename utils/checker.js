const Booking = require('../models/booking.model')
const constants = require('./constants')

exports.checkBookingStatus = (bookingId) => {

    setTimeout(async () => {
        const bookingData = await Booking.findOne({_id : bookingId});

        if(bookingData.bookingStatus != constants.bookingStatuses.completed){
            bookingData.bookingStatus = constants.bookingStatuses.cancelled;
            await bookingData.save()
        }
    }, 120000);

}