const constants = require("../utils/constants");

exports.validateUserType = async (req, res, next) => {

    let userTypes = Object.values(constants.userTypes);

    let userType = req.query.userType;

    if (userType && userTypes.includes(userType)) {
        return res.status(400).send({
            message: "UserType provided is not correct. Possible correct values : ADMIN | CUSTOMER | THEATRE_OWNER"
        })
    }

    next();

}


exports.validateUserStatus = async (req, res, next) => {

    let userStatuses = Object.values(constants.userStatus);

    let userStatus = req.query.userStatus;

    if (userStatus && userStatuses.includes(userStatus)) {
        return res.status(400).send({
            message: "userStatus provided is not correct. Possible correct values : APPROVED | PENDING | REJECTED"
        })
    }

    next();

}