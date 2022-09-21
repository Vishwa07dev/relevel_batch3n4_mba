const Booking = require("../models/booking.model");
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const verifyPaymentReqBody = async (req, res, next) => {
    try {

        if (!req.body.bookingId) {
            return res.status(400).send({
                message: "Failed ! BookingId is not provided"
            });
        }else {
            if(!mongoose.Types.ObjectId.isValid(req.body.bookingId)){
                return res.status(400).send({
                    message: "Booking Id is not valid"
                })
            }
        }

        const booking = await Booking.findOne({
            _id: req.body.bookingId
        });

        if (!booking) {

            return res.status(400).send({
                message: "Booking Id doesn't exist"
            });
        }

        if(booking.status == constants.bookingStatuses.cancelled){

            return res.status(400).send({

                message: "This booking was already cancelled.."
            });
        }else if(booking.status == constants.bookingStatuses.completed){

            return res.status(400).send({

                message: "This booking was already completed.."
            })
        }else if(booking.status == constants.bookingStatuses.failed){

            return res.status(400).send({

                message: "Sorry..This Booking was already failed"
            });
        }

        req.bookingInParams = booking;

        if(!req.body.amount){

            return res.status(400).send({
                message: "amount is not provided"
            });

        }else if(typeof req.body.amount !== "number"){

            return res.status(400).send({

                message: "the amount given was not in the correct format..."
            });

        }else if(booking.totalCost != req.body.amount){

            return res.status(200).send({

                message: "The payable amount does not matches with the total cost of the booking...."
            });
        }

        next();

    } catch (err) {
        console.log("Error while validating the payment request body", err.message);

        return res.status(500).send({

            message: "Some internal error.."
        });
    }
};

const verifyPayment = {

    verifyPaymentReqBody
}

module.exports = verifyPayment;