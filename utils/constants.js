const ObjectId = require("mongoose").Types.ObjectId
module.exports = {
    movieReleaseStatuses : {
        released : "RELEASED",
        coming_soon : "COMING_SOON",
        blocked : "BLOCKED"
    },

    movieGenre : {
        action : "ACTION",
        comedy : "COMEDY",
        drama : "DRAMA",
        fantasy : "FANTASY",
        horror : "HORROR",
        mystery : "MYSTERY",
        romance : "ROMANCE",
        thriller : "THRILLER"
    },

    theatreShows : {
        morning : "MORNING",
        noon : "NOON",
        evening : "EVENING",
        night : "NIGHT",
    },
    userTypes : {
        customer : "CUSTOMER",
        admin : "ADMIN",
        theatre_owner : "THEATRE_OWNER"
    },

    userStatus : {
        pending : "PENDING",
        approved : "APPROVED",
        rejected : "REJECTED"
    },

    bookingStatuses: {
        inProgress: "IN_PROGRESS",
        completed: "COMPLETED",
        cancelled: "CANCELLED",
        failed: "FAILED"
    },
    paymentStatus : {
        successful : "SUCCESSFUL",
        failed : "FAILED"
    },
    isValidObjectId : (id) => {

        if (ObjectId.isValid(id)){
            if((String)(new ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    }
}