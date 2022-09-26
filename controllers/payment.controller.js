const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const clinetConfig = require('../configs/client.config');
const sendNotificationReq = require('../utils/notificationClient');

module.exports = (subject, content, recepients, requester) => {

    //create the request body
    const reqBody = {
        subject: subject,
        recepientEmails: recepients,
        content: content,
        requester: requester
    }


    //Prepare the headers
    const reqHeader = {
        "Content-Type": "application/json"
    }

    //Combine headers and req body together
    const args = {
        data: reqBody,
        headers: reqHeader
    }
    console.log(args);

    //make a post call and handle the response 

    try {
        console.log("in the client function")
        client.post(ClientRestCall.CLIENT_REST_CALL, args, (data, res) => {

            console.log("Request sent");
            console.log(data);

        })
    } catch (err) {
        console.log("Some Error while sending the message : ", err.message);
    }
}

exports.getAllPayments = async(req, res) => {
    try {
        let queryObj = {};

        if (req.user.userType != constants.userTypes.admin) {
            queryObj._id = req.user.myPayments;
        }

        const payments = await Payment.find(queryObj);

        res.status(200).send(payments);
    } catch {
        console.log("Error while getting given all payment records", err.message);

        return res.status(500).send({
            message: "Some internal error"
        })
    }
}


exports.getOnePayment = async(req, res) => {

    res.status(200).send(req.paymentInParams);

}

exports.createPayment = async(req, res) => {

    try {
        const paymentObj = {
            bookingId: req.body.bookingId,
            amount: req.body.amount,
            status: req.body.status
        }

        const payment = await Payment.create(paymentObj);

        req.booking.status = payment.status == constants.paymentStatuses.success ? constants.bookingStatuses.completed : constants.bookingStatuses.failed;
        await req.booking.save()

        req.user.myPayments.push(payment._id);
        await req.user.save();
        await sendNotificationReq("Payment Successfuly MovieBooking", payment, req.user.email, clinetConfig.companyEmail);
        res.status(201).send(payment);

    } catch (err) {
        console.log("Error while creating the payment", err.message);

        return res.status(500).send({
            message: "Some internal error"
        });
    }

}