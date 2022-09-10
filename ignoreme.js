  
    if(req.body.addMovies){
        let movies = req.body.addMovies;
        movies.forEach(async(mov) => {
            theatre.movies.push(mov)
            let currentMovie = await Movie.findOne({_id:mov})
            currentMovie.theatres.push(theatre._id)
        });

    }
    
    if(req.body.deleteMovies){
        let movies = req.body.addMovies;
        let leftMovies =theatre.movies.filter((mov ) =>{ !movies.includes(mov)})  
        leftMovies.forEach( async(mov) => {
            theatre.movies.push(mov);
            let currentMovie = await Movie.findOne({_id:mov})
            let updatedMoviesTheatres =currentMovie.theatres.filter(( t ) =>{ t!= theatre})  
            console.log(updatedMoviesTheatres)
            updatedMoviesTheatres.forEach((t) =>{
                currentMovie.theatres.push(t)
            })
        });      
    }
   