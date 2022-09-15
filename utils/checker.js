const Booking = require('../models/booking.model')
const constants = require('./constants')
const ObjectId = require('mongoose').Types.ObjectId;

exports.checkBookingStatus = (bookingId) => {

    setTimeout(async () => {
        const bookingData = await Booking.findOne({_id : bookingId});

        if(bookingData.bookingStatus != constants.bookingStatuses.completed){
            bookingData.bookingStatus = constants.bookingStatuses.canceled;
            await bookingData.save()
        }
    }, 120000);

}

exports.isValidObjectId = (id) => {

    if (ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

exports.isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
