const ObjectId = require("mongoose").Types.ObjectId;
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
    isValidEmail : (email) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    },
    

    isValidObjectId : (id) => {

      if(ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) return true;
        return false;
      }
      return false;
    },
    validatePIN  : (pin) => {
        return /^(\d{4}|\d{6})$/.test(pin);
    }
}