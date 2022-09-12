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
    if (!casts) {
        return res.status(400).send({
            message: "Failed ! Casts is not provided"
        })
    }
    if (!Array.isArray(casts)) {
        return res.status(400).send({
            message: "Failed ! Casts is need to be Array"
        })
    }
    if (casts.length == 0) {
        return res.status(400).send({
            message: "Failed ! Casts is empty Array"
        })
    }
    if (!trailerUrls) {
        return res.status(400).send({
            message: "Failed ! Trailer Urls is not provided"
        })
    }
    if (!Array.isArray(trailerUrls)) {
        return res.status(400).send({
            message: "Failed ! Trailer Urls is need to be Array"
        })
    }
    if (trailerUrls.length == 0) {
        return res.status(400).send({
            message: "Failed ! Trailer Urls is empty Array"
        })
    }
    if (trailerUrls && !isValidURL(trailerUrls)) {
        return res.status(400).send({
            message: "Failed ! Trailer Url not proper format"
        })
    }
    if (!posterUrls) {
        return res.status(400).send({
            message: "Failed ! Poster Urls is not provided"
        })
    }
    if (!Array.isArray(posterUrls)) {
        return res.status(400).send({
            message: "Failed ! Poster Urls is need to be Array"
        })
    }
    if (posterUrls.length == 0) {
        return res.status(400).send({
            message: "Failed ! Poster Urls is empty Array"
        })
    }
    if (posterUrls && !isValidURL(posterUrls)) {
        return res.status(400).send({
            message: "Failed ! Poster Url not proper format"
        })
    }
    if (!languages) {
        return res.status(400).send({
            message: "Failed ! languages is not provided"
        })
    }
    
    if (!Array.isArray(languages)) {
        return res.status(400).send({
            message: "Failed ! Languages is need to be Array"
        })
    }
    if (languages.length == 0) {
        return res.status(400).send({
            message: "Failed ! languages iis empty Array"
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