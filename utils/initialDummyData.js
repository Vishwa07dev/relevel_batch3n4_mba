const constants = require("./constants");

module.exports = async (Movie) => {
    await Movie.collection.drop();
    const movie1 = await Movie.create({
        name : "KGF - chapter 2",
        description : " about Kolar Gold Field",
        casts : "Yash",
        trailerUrls : "https://youtu.be/Qah9sSIXJqk",
        posterUrls : "https://youtu.be/Qah9sSIXJqk",
        language : "Kannada",
        releaseDate : Date.now() + 15*24*60*60*1000,
        releaseStatus : constants.releaseStatuses.released,
        imdbRating : 9.8,
        genre : [constants.genres.scifi, constants.genres.fiction]
    });
}