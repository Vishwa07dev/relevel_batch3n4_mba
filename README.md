# Movie Booking application
This project is node.js back-end code for a movie booking application that can create various entities like users, movies, theatres, bookings and payments as well as perform various actions on them.

<br/>

## Features

>**Account creation**
- You can create accounts for user as well as theatre owner.
- If the user is a customer, the account will autometically be approved on verification.
- In case of theatre owner, an admin will have to approve the account.
- JSON Web Token used for authentication.
- Users can also update some details like name, password and email.
- Admin can update additional details like userType and userStatus.
- User search is also available for users with proper authorization.

>**Movie API**
- An admin can create a new movie, Edit an existing movie and delete an existing movie.
- All registered users can get a list of all movies as well as a single movie using movieId.

>**Theatre API**
- A theatre owner or an admin can create a new theatre, Edit their existing theatre and delete their existing theatre.
- All registered users can get a list of all theatres as well as a single theatre using theatreId.
- All registered users can get a list of all the movies released in a single theatre using theatreId.
- A theatre owner or an admin can add or remove a new movie in an existing theatre.

>**Booking API**
- All registered users can create a new booking and update their existing booking.
- All registered users can get a list of all of their bookings as well as a single booking using bookingId.
- An admin can get the list of all the bookings.

>**Payment API**
- All registered users with a booking can create a payment for their booking.
- All registered users can get a list of all of their payments as well as a single payment using paymentId.
- An admin can get the list of all the payments.

<br/>

## Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|node-rest-client|
|dotenv|
|body-parser|
|bcryptjs|

|external applications|
|-|
|notification service application|

<br/>

## REST API paths

>**User creation and operations**

- **Sign-up**<br/>
`POST /mba/api/v1/auth/signup`<br/>
Register user with name, userId, email, password and user type.<br/><br/>

- **Sign-in**<br/>
`POST /mba/api/v1/auth/signin`<br/>
User Sign-in using userId and password.<br/><br/>

- **Get all users (Query params userType and userStatus supported)**<br/>
`GET /mba/api/v1/users`<br/>
An admin can get a list of all users. The list can also be filtered by userType and userStatus.<br/><br/>

- **Get user by userId**<br/>
`GET /mba/api/v1/users/:id`<br/>
A user or an admin can get the data of the user by userId.<br/><br/>

- **Update user data**<br/>
`PUT /mba/api/v1/users/:id`<br/>
A user or an admin can update the data of the user by userId.<br/><br/>

>**Movie creation and operations**

- **Create new movie**<br/>
`POST /mba/api/v1/movies`<br/>
Admin can create a movie.<br/><br/>

- **Update a movie**<br/>
`PUT /mba/api/v1/movies/:id`<br/>
Admin can update a movie.<br/><br/>

- **Delete a movie**<br/>
`DELETE /mba/api/v1/movies/:id`<br/>
Admin can delete a movie.<br/><br/>

- **Get all movies**<br/>
`GET /mba/api/v1/movies`<br/>
Any user can get a list of all movies<br/><br/>

- **Get Single movie**<br/>
`GET /mba/api/v1/movies/:id`<br/>
Any user can get a single movie by movieId<br/><br/>

>**Theatre creation and operations**

- **Create new theatre**<br/>
`POST /mba/api/v1/theatres`<br/>
A theatre owner or an admin can create a theatre.<br/><br/>

- **Update a theatre**<br/>
`PUT /mba/api/v1/theatres/:id`<br/>
A theatre owner or an admin can update their theatre.<br/><br/>

- **Delete a theatre**<br/>
`DELETE /mba/api/v1/theatres/:id`<br/>
A theatre owner or an admin can delete their theatre.<br/><br/>

- **Get all theatres**<br/>
`GET /mba/api/v1/theatres`<br/>
Any user can get a list of all theatres<br/><br/>

- **Get Single theatre**<br/>
`GET /mba/api/v1/theatres/:id`<br/>
Any user can get a single theatre by theatreId<br/><br/>

- **Get movies in a theatre**<br/>
`GET /mba/api/v1/theatres/:id/movies`<br/>
Any user can get movies inside a theatre by theatreId<br/><br/>

- **Update movies in a theatre**<br/>
`PUT /mba/api/v1/theatres/:id/movies`<br/>
A theatre owner or an admin can update movies inside their theatre by theatreId.<br/><br/>

>**Booking creation and operations**

- **Create new booking**<br/>
`POST /mba/api/v1/bookings`<br/>
Any user can create a booking.<br/><br/>

- **Update a booking**<br/>
`PUT /mba/api/v1/bookings/:id`<br/>
Any user can update their booking.<br/><br/>

- **Get Single booking**<br/>
`GET /mba/api/v1/bookings/:id`<br/>
Any user can get a single booking by bookingId<br/><br/>

- **Get all bookings**<br/>
`GET /mba/api/v1/bookings`<br/>
Any user can get a list of all their bookings<br/><br/>

>**Payment creation and operations**

- **Create new payment**<br/>
`POST /mba/api/v1/payments`<br/>
Any user can create a payment.<br/><br/>

- **Get Single payment**<br/>
`GET /mba/api/v1/payments/:id`<br/>
Any user can get a single payment by paymentId<br/><br/>

- **Get all payments**<br/>
`GET /mba/api/v1/payments`<br/>
Any user can get a list of all their payments<br/><br/>
