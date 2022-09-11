const constants = require("../utils/constants");

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function checkEnumData(data, arrData){
    let check = true;

    for(let i=0;i<data.length;i++){
        if(!arrData.includes(data[i])){
            check = false;
            break;
        }
    }
    return check;
}

function validateIdArr(data){
    let check = true;

    for(let i=0;i<data.length;i++){
        if(!isValidObjectId(data[i])){
            check = false;
            break;
        }
    }
    return check;
}


exports.validateTheatreRequest = async (req, res, next) => {

    let showTypesArr = Object.keys(constants.theatreShows)

    let {
        ownerId,
        name,
        description,
        city,
        pinCode,
        showTypes,
        numberOfSeats
    } = req.body

    if(req.user.userType == constants.userTypes.admin){
        if (!ownerId) {
            return res.status(400).send({
                message: "Failed ! Owner Id is not provided"
            })
        }
        if (!isValidObjectId(ownerId)) {
            return res.status(400).send({
                message: "Failed ! Owner Id is not proper format"
            })
        }
    }
    
    if (!name) {
        return res.status(400).send({
            message: "Failed ! Theatre name is not provided"
        })
    }
    if (!description) {
        return res.status(400).send({
            message: "Failed ! Theatre description is not provided"
        })
    }
    if (!city) {
        return res.status(400).send({
            message: "Failed ! City is not provided"
        })
    }
    if (!pinCode) {
        return res.status(400).send({
            message: "Failed ! Pin code is not provided"
        })
    }
    if (!numberOfSeats) {
        return res.status(400).send({
            message: "Failed ! Number Of Seats is not provided"
        })
    }
    if (!showTypes && showTypes.length <= 0) {
        return res.status(400).send({
            message: "Failed ! Show Types is not provided"
        })
    }
    if (showTypes && !checkEnumData(showTypes, showTypesArr)) {
        return res.status(400).send({
            message: "Failed ! Show Types is not Proper format"
        })
    }

    next();

}

exports.validateRequestForAddAndRemove = async (req, res, next) => {
    let {
        addMovies,
        removeMovies,
    } = req.body

    if(addMovies && validateIdArr(addMovies)){
        return res.status(400).send({
            message: "Failed ! Movies Id is not proper to add"
        })
    }

    if(removeMovies && validateIdArr(removeMovies)){
        return res.status(400).send({
            message: "Failed ! Movies Id is not proper to delete"
        })
    }
    
    next();

}