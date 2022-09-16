const ObjectId = require('mongoose').Types.ObjectId;

exports.isValidObjectId = (id) => {

    if (ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}