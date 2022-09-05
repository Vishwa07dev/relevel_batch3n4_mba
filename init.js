const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model");
// const constants = require("./utils/constants");
const constants = require("./utils/constants");

const movieData = async () => {
  try {
    const movies = [];
    (movies[0] = {
      name: "Movie 1",
      description: "Description for movie 1",
      casts: ["SomeOne", "SomeOneElse"],
      trailerUrls: ["TrailerURL"],
      posterUrls: ["PosterURL"],
      languages: ["English", "Hindi"],
      releaseDate: 2022 - 10 - 10,
      releaseStatus: constants.movieReleaseStatuses.coming_soon,
      imdbRating: 8.5,
      genre: [constants.movieGenre.action],
    }),
      (movies[0] = {
        name: "Movie 1",
        description: "Description for movie 1",
        casts: ["SomeOne", "SomeOneElse"],
        trailerUrls: ["TrailerURL"],
        posterUrls: ["PosterURL"],
        languages: ["English", "Hindi"],
        releaseDate: 2022 - 10 - 10,
        releaseStatus: constants.movieReleaseStatuses.coming_soon,
        imdbRating: 8.5,
        genre: [constants.movieGenre.action],
      }),
      (movies[1] = {
        name: "Movie 2",
        description: "Description for movie 2",
        casts: ["SomeOne", "SomeOneElse"],
        trailerUrls: ["TrailerURL"],
        posterUrls: ["PosterURL"],
        languages: ["English", "Hindi"],
        releaseDate: 2022 - 09 - 09,
        releaseStatus: constants.movieReleaseStatuses.coming_soon,
        imdbRating: 8.5,
        genre: [constants.movieGenre.action],
      }),
      (movies[2] = {
        name: "Movie 3",
        description: "Description for movie 3",
        casts: ["SomeOne", "SomeOneElse"],
        trailerUrls: ["TrailerURL"],
        posterUrls: ["PosterURL"],
        languages: ["English", "Hindi"],
        releaseDate: 2022 - 12 - 12,
        releaseStatus: constants.movieReleaseStatuses.coming_soon,
        imdbRating: 8.5,
        genre: [constants.movieGenre.action],
      });

    await Movie.insertMany(movies);
  } catch (err) {
    console.log("#### Error in seed data initialization #### ", err.message);
  }
};

const theatreData = async () => {
  theatresInfo = [
    {
      name: "Krissh",
      description: "Multiplex of fun",
      city: "Mumbai",
      pinCode: 488884,
      showTypes: [constants.showTypes.noon, constants.showTypes.evening],
      numberOfSeats: 122,
    },
    {
      name: "Khanna",
      description: "NEW ",
      city: "Kochi",
      pinCode: 123456,
      showTypes: [constants.showTypes.evening],
      numberOfSeats: 111,
    },
    {
      name: "INOX",
      description: "funTimes",
      city: "Thane",
      pinCode: 421208,
      showTypes: [constants.showTypes.night],
      numberOfSeats: 111,
    },
  ];
  try {
    await Theatre.insertMany(theatresInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { theatreData, movieData };
