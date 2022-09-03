# MovieBookingApplication Service API

---

- This Movie Booking Service API revolves around the listing the movies and provide a functionality to book the movies.

### Features

---

- API to create Movie resource (as of now)

### Code organisation in the repository-

---

The whole code base is arranged in multiple directories and files.
Project follows Models, Controllers, Routes (MCR Architecture Pattern), to arrange the code.

1. Models directory contain files dealing with the defining the database Schemas.
2. Controllers directory contain files dealing with handling the core business logic.
3. Routes directory contain the files managing with the routes.
4. Middlewares directory to define all middlewares(generally related for validating incoming requests).
5. Utils directory contains the files that have reusable code(functions).
6. Configs directory for all configs file to configure all the configurations realted to server,database.
7. The main startup file is "server.js".

### Tech

---

Movie Booking Service API , uses a number of open source projects (all are npm packages) to work properly:

- [Express](https://www.npmjs.com/package/express)- Express is a web framework for node. Using it to create a server and managing dofferent routes.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv to load environment variables from a .env file into process.env
- [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [body-parser](https://www.npmjs.com/package/body-parser) - Body parser parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- this app requires Node.js(Runtime Environment) v16+ and mongodb v5+(Database, for persistance of data) to run.

#### Install the dependencies  by following instructions.

```sh
cd mbServiceAPI
npm install
```

##### Before running the app locally, ensure to change .env and rewrite all your configuration variables value over there.Incase running in production,ensure to configre those variables first in production and change the scripts property value under package.json file accordingly.

### Installation

---

- To make mbServiceAPI is up and running in your machine, follow the below steps after all configuration and related dependecies installation done.

```sh
cd mbServiceAPI
npm start
```

Express application,Movie Booking Service API will up and running on configured port.

### Different REST endpoints available ---

##### 1. Movie Creation(POST) Request

---

```sh
POST /mbs/api/v1/movies
Headers :
 Content-Type:application/json

Sample request body :
{
  "name": "Vikram Vedha",
  "description": "Vikram Vedha is an action-thriller showcasing the face-off between a tough cop Vikram  and a dreaded gangster Vedha .",   
  "casts": "Saif Ali Khan,Hrithik Roshan,Radhika Apte",    
  "trailerUrls":"https://domainName/resource",
  "posterUrls": "https://domainName/resource",
  "language": "English,Hindi",
  "releaseDate": "2022-09-30", 
  "genre": "ACTION,CRIME,THRILLER" 
}
Sample response body :
{
    "data": {
        "name": "Vikram Vedha",
        "description": "Vikram Vedha is an action-thriller showcasing the face-off between a tough cop Vikram  and a dreaded gangster Vedha .",
        "casts": [
            "Saif Ali Khan",
            "Hrithik Roshan",
            "Radhika Apte"
        ],
        "trailerUrls": [
            "https://domainName/resource"
        ],
        "posterUrls": [
            "https://domainName/resource"
        ],
        "language": [
            "English",
            "Hindi"
        ],
        "releaseDate": "2022-09-30T00:00:00.000Z",
        "releaseStatus": "COMING_SOON",
        "genre": [
            "ACTION",
            "CRIME",
            "THRILLER"
        ],
        "_id": "63139439fe51be114b16c75d",
        "createdAt": "2022-09-03T17:51:53.779Z",
        "updatedAt": "2022-09-03T17:51:53.779Z"
    }
}

```

Details about the JSON structure (Request Body)

- name : Mandatory
- description : Manadatory
- casts : Manadatory
- trailerUrls : Manadatory
- posterUrls : Manadatory
- language : Manadatory
- releaseDate : Optional,Not Manadatory
- releaseStatus : Optional. DefaultValue is COMING_SOON.  Allowed values are:- RELEASED | COMING_SOON | BLOCKED
- genre : Manadatory. Allowed values are: COMEDY | ROMCOM | DRAMA |ROMANTIC| SCIFI | OFFBEAT |ACTION |CRIME |THRILLER
- imdbRating -Optional,Not Manadatory

#### 2. Get all the movies

---

```sh
GET /mbs/api/v1/movies
Headers :
 Content-Type:application/json
Sample request body : <EMPTY>
Sample response body:
{
    "data": [
        {
            "_id": "6313942dfe51be114b16c75b",
            "name": "Liger",
            "description": "The journey of Liger, from Karimnagar to Mumbai, from a nobody to a competitor, in his search for recognition while navigating his weaknesses, relationships, and love life.",
            "casts": [
                "Vijay Deverakonda",
                "Ananya Panday",
                "Ronit Roy",
                "Ramya Krishnan",
                "Mike Tyson"
            ],
            "trailerUrls": [
                "https://domainName/resource",
                "https://domainName/resource2"
            ],
            "posterUrls": [
                "https://domainName/resource",
                "https://domainName/resource2"
            ],
            "language": [
                "Hindi",
                "Telugu"
            ],
            "releaseDate": "2022-08-25T00:00:00.000Z",
            "releaseStatus": "RELEASED",
            "imdbRating": 3.1,
            "genre": [
                "ACTION",
                "ROMANTIC",
                "DRAMA"
            ],
            "createdAt": "2022-09-03T17:51:41.624Z",
            "updatedAt": "2022-09-03T17:51:41.624Z"
        },
        {
            "_id": "63139439fe51be114b16c75d",
            "name": "Vikram Vedha",
            "description": "Vikram Vedha is an action-thriller showcasing the face-off between a tough cop Vikram  and a dreaded gangster Vedha .",
            "casts": [
                "Saif Ali Khan",
                "Hrithik Roshan",
                "Radhika Apte"
            ],
            "trailerUrls": [
                "https://domainName/resource"
            ],
            "posterUrls": [
                "https://domainName/resource"
            ],
            "language": [
                "English",
                "Hindi"
            ],
            "releaseDate": "2022-09-30T00:00:00.000Z",
            "releaseStatus": "COMING_SOON",
            "genre": [
                "ACTION",
                "CRIME",
                "THRILLER"
            ],
            "createdAt": "2022-09-03T17:51:53.779Z",
            "updatedAt": "2022-09-03T17:51:53.779Z"
        }
    ],
    "totalDocumentCount": 2
}
  
```

#### 3. Get all the movies based on optional passed query parameters

---

```sh
GET /mbs/api/v1/movies?name=<value>&casts=<value>&language=<value>&genre=<value>&releaseStatus=<value>&releaseDate=<value>
GET /mbs/api/v1/movies?genre=DRAMA (EXAMPLE)
Headers :
 Content-Type:application/json
Sample request body : <EMPTY>
Sample response body:
{
    "data": [
        {
            "_id": "6313942dfe51be114b16c75b",
            "name": "Liger",
            "description": "The journey of Liger, from Karimnagar to Mumbai, from a nobody to a competitor, in his search for recognition while navigating his weaknesses, relationships, and love life.",
            "casts": [
                "Vijay Deverakonda",
                "Ananya Panday",
                "Ronit Roy",
                "Ramya Krishnan",
                "Mike Tyson"
            ],
            "trailerUrls": [
                "https://domainName/resource",
                "https://domainName/resource2"
            ],
            "posterUrls": [
                "https://domainName/resource",
                "https://domainName/resource2"
            ],
            "language": [
                "Hindi",
                "Telugu"
            ],
            "releaseDate": "2022-08-25T00:00:00.000Z",
            "releaseStatus": "RELEASED",
            "imdbRating": 3.1,
            "genre": [
                "ACTION",
                "ROMANTIC",
                "DRAMA"
            ],
            "createdAt": "2022-09-03T17:51:41.624Z",
            "updatedAt": "2022-09-03T17:51:41.624Z"
        }
    ],
    "totalDocumentCount": 1
}
```

#### 4. Get specific movie detail based on movieId

---

```sh
GET /mbs/api/v1/movies/:id

GET /mbs/api/v1/movies/6313942dfe51be114b16c75b (Example)
Headers :
 Content-Type:application/json

Sample request body : <EMPTY>
Sample response body : 
{
    "data": {
        "_id": "6313942dfe51be114b16c75b",
        "name": "Liger",
        "description": "The journey of Liger, from Karimnagar to Mumbai, from a nobody to a competitor, in his search for recognition while navigating his weaknesses, relationships, and love life.",
        "casts": [
            "Vijay Deverakonda",
            "Ananya Panday",
            "Ronit Roy",
            "Ramya Krishnan",
            "Mike Tyson"
        ],
        "trailerUrls": [
            "https://domainName/resource",
            "https://domainName/resource2"
        ],
        "posterUrls": [
            "https://domainName/resource",
            "https://domainName/resource2"
        ],
        "language": [
            "Hindi",
            "Telugu"
        ],
        "releaseDate": "2022-08-25T00:00:00.000Z",
        "releaseStatus": "RELEASED",
        "imdbRating": 3.1,
        "genre": [
            "ACTION",
            "ROMANTIC",
            "DRAMA"
        ],
        "createdAt": "2022-09-03T17:51:41.624Z",
        "updatedAt": "2022-09-03T17:51:41.624Z"
    }
}
```

#### 5. Update specific movie detail based on movieId

---

```sh
PUT /mbs/api/v1/movies/:id

PUT /mbs/api/v1/movies/6313942dfe51be114b16c75b (Example)
Headers :
 Content-Type:application/json

Sample request body : 
{
   "imdbRating":5.1,
   "language":"Hindi,Telugu,Kannada"
}
Sample response body : 
{
    "data": {
        "_id": "6313942dfe51be114b16c75b",
        "name": "Liger",
        "description": "The journey of Liger, from Karimnagar to Mumbai, from a nobody to a competitor, in his search for recognition while navigating his weaknesses, relationships, and love life.",
        "casts": [
            "Vijay Deverakonda",
            "Ananya Panday",
            "Ronit Roy",
            "Ramya Krishnan",
            "Mike Tyson"
        ],
        "trailerUrls": [
            "https://domainName/resource",
            "https://domainName/resource2"
        ],
        "posterUrls": [
            "https://domainName/resource",
            "https://domainName/resource2"
        ],
        "language": [
            "Hindi",
            "Telugu",
            "Kannada"
        ],
        "releaseDate": "2022-08-25T00:00:00.000Z",
        "releaseStatus": "RELEASED",
        "imdbRating": 5.1,
        "genre": [
            "ACTION",
            "ROMANTIC",
            "DRAMA"
        ],
        "createdAt": "2022-09-03T17:51:41.624Z",
        "updatedAt": "2022-09-03T17:58:31.183Z"
    }
}
```

#### 6. Delete specific movie detail based on movieId

---

```sh
DELETE /mbs/api/v1/movies/:id

DELETE /mbs/api/v1/movies/6313942dfe51be114b16c75b (Example)
Headers :
 Content-Type:application/json

Sample request body : <EMPTY>
Sample repsonse body: 
{
    "message": "Succesfully deleted movie"
}
```
