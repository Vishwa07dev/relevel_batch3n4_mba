const Theatre = require("../models/theatre.model");

module.exports = async (theatreId, noOfSeats) => {
    
    const theatre = await Theatre.findOne({
        _id: theatreId
    });

    return (theatre.ticketPrice * noOfSeats);
}