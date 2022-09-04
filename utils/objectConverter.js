exports.movieResponse=(movies)=>{
    movieResult=[];
    movies.forEach(movie => {
         
        movieResult.push({
            name:movie.name,
            description:movie.description,
            casts:movie.casts,
            trailerUrls:movie.trailerUrls,
            posterUrls:movie.posterUrls,
            language:movie.language,
            releaseDate:movie.releaseDate,
            releaseStatus:movie.releaseStatus,
            imdbRating:movie.imdbRating,
            genre:movie.genre
        });
    });
    return movieResult;
}


