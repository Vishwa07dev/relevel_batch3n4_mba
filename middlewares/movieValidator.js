const constants = require("../utils/constants");

function isValidURL(urlArr) {
    let check = true;

    for (let i = 0; i < urlArr.length; i++) {
        let url = urlArr[i];
        let urlCheck = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (urlCheck == null) {
            check = false;
            break;
        }

    }

    return check;
};

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

exports.validateMovieRequest = async (req, res, next) => {

    let releaseStatusArr = Object.keys(constants.movieReleaseStatuses)
    let genreArr = Object.keys(constants.movieGenre)

    let {
        name,
        description,
        casts,
        trailerUrls,
        posterUrls,
        languages,
        releaseStatus,
        genre
    } = req.body

    if (!name) {
        return res.status(400).send({
            message: "Failed ! Movie name is not provided"
        })
    }
    if (!description) {
        return res.status(400).send({
            message: "Failed ! Movie description is not provided"
        })
    }
    if (!casts && casts.length <= 0) {
        return res.status(400).send({
            message: "Failed ! Casts is not provided"
        })
    }
    if (!trailerUrls && trailerUrls.length <= 0) {
        return res.status(400).send({
            message: "Failed ! Trailer Urls is not provided"
        })
    }
    if (trailerUrls && !isValidURL(trailerUrls)) {
        return res.status(400).send({
            message: "Failed ! Trailer Url not proper format"
        })
    }
    if (!posterUrls && posterUrls.length <= 0) {
        return res.status(400).send({
            message: "Failed ! Poster Urls is not provided"
        })
    }
    if (posterUrls && !isValidURL(posterUrls)) {
        return res.status(400).send({
            message: "Failed ! Poster Url not proper format"
        })
    }
    if (!languages && languages.length <= 0) {
        return res.status(400).send({
            message: "Failed ! languages is not provided"
        })
    }
    if (!releaseStatus) {
        return res.status(400).send({
            message: "Failed ! Release Status is not provided"
        })
    }
    if (releaseStatus && !checkEnumData(releaseStatus, releaseStatusArr)) {
        return res.status(400).send({
            message: "Failed ! Release Status is not Proper format"
        })
    }
    if (genre && !checkEnumData(genre, genreArr)) {
        return res.status(400).send({
            message: "Failed ! genre is not Proper format"
        })
    }

    next();

}