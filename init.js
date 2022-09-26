const User = require('./models/user.model')
const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constants = require('./utils/constants')
const bcrypt = require('bcryptjs')
const Booking = require('./models/booking.model')
const Payment = require('./models/payment.model')

module.exports = async ()=>{
    try{

        await User.collection.drop();
        console.log("#### User collection dropped ####");
        await Movie.collection.drop();
        console.log("#### Movie collection dropped ####");
        await Theatre.collection.drop();
        console.log("#### Theatre collection dropped ####");
        await Booking.collection.drop();
        console.log("Booking collection dropped ");
        await Payment.collection.drop();
        console.log("#### Payment collection dropped ####");

        await User.create({
            name : "Dharmit",
            userId : "admin",
            password : bcrypt.hashSync("AdminOfTheApp@123",8),
            email : "dharmit@admin.com",
            userType : constants.userTypes.admin
        });


        console.log("#### Admin user created ####");

        const users = [];
        users[0] = {
            name : "Dharmit Customer",
            userId : "customer1",
            password : bcrypt.hashSync("Customer@1",8),
            email : "dharmit@customer.com",
            userType : constants.userTypes.customer
        },
        users[1] = {
            name : "Theatre Owner 1",
            userId : "theatreOwner1",
            password : bcrypt.hashSync("TheatreOwner@1",8),
            email : "theatreOwner1@app.com",
            userType : constants.userTypes.theatre_owner
        },
        users[2] = {
            name : "Theatre Owner 2",
            userId : "theatreOwner2",
            password : bcrypt.hashSync("TheatreOwner@2",8),
            email : "theatreOwner2@app.com",
            userType : constants.userTypes.theatre_owner
        },

        usersCreated = await User.insertMany(users);

        const theatres = [];
        theatres[0] = {
            ownerId : usersCreated[1]._id,
            name : "Theatre 1",
            description : "Description for theatre 1",
            city : "Mumbai",
            pinCode : 400049,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100,
            ticketPrice : 145
        },
        theatres[1] = {
            ownerId : usersCreated[2]._id,
            name : "Theatre 2",
            description : "Description for theatre 2",
            city : "Ahmedabad",
            pinCode : 380007,
            showTypes : [constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 50,
            ticketPrice : 120
        },
        theatres[2] = {
            ownerId : usersCreated[2]._id,
            name : "Theatre 3",
            description : "Description for theatre 3",
            city : "New Delhi",
            pinCode : 110031,
            showTypes : [constants.theatreShows.evening],
            numberOfSeats : 75,
            ticketPrice : 235
        }

        theatresCreated = await Theatre.insertMany(theatres);
        await usersCreated[1].theatresOwned.push(theatresCreated[0]._id);
        await usersCreated[2].theatresOwned.push(theatresCreated[1]._id, theatresCreated[2]._id);
        await usersCreated[1].save();
        await usersCreated[2].save();

        const movies = [];
        movies[0] = {
            name : "Movie 1",
            description : "Description for movie 1",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-10-10,
            releaseStatus : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[1] = {
            name : "Movie 2",
            description : "Description for movie 2",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["English","Hindi"],
            releaseDate : 2022-09-09,
            releaseStatus : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        },
        movies[2] = {
        name : "Movie 3",
        description : "Description for movie 3",
        casts : ["SomeOne", "SomeOneElse"],
        trailerUrls : ["TrailerURL"],
        posterUrls : ["PosterURL"],
        languages : ["English","Hindi"],
        releaseDate : 2022-12-12,
        releaseStatus : constants.movieReleaseStatuses.coming_soon,
        imdbRating : 8.5,
        genre : [constants.movieGenre.action]
        }

        moviesCreated = await Movie.insertMany(movies);

        await theatresCreated[0].movies.push(moviesCreated[0]._id, moviesCreated[1]._id)
        await moviesCreated[0].theatres.push(theatresCreated[0]._id)
        await moviesCreated[1].theatres.push(theatresCreated[0]._id)
    
        await theatresCreated[0].save()
        await moviesCreated[0].save()
        await moviesCreated[1].save()

        const booking = await Booking.create({
            totalCost : 200,
            theatreId : theatresCreated[0]._id,
            movieId : moviesCreated[0]._id,
            userId : usersCreated[0]._id,
            noOfSeats : 2,
            ticketBookedTime : Date.now(),
            status : constants.bookingStatuses.completed
        });

        await usersCreated[0].myBookings.push(booking._id)
        await moviesCreated[0].bookings.push(booking._id)

        await usersCreated[0].save();
        await theatresCreated[0].save();
        await moviesCreated[0].save();

        const payment = await Payment.create({
            bookingId : booking._id,
            amount : 200,
            status : constants.paymentStatuses.success
        })

        await usersCreated[0].myPayments.push(payment._id);
        await usersCreated[0].save();


        console.log("#### Seed data initialized ####");
    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}