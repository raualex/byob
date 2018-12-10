# BYOB - Comedy Club API

## Take a break and get in a laugh with the Comedy Club API. This API lets you find comedy clubs in 30 US cities while providing information on that city so you can plan a vacation in advance! A PostgreSQL database with well-documented API and built with Node.js, Express, and Knex.js.

### How to Use:

#### Install and Start Server
* Clone this repo.

* `npm install`

* `npm start`

#### Create Postgres Database and Run Migrations
* `psql CREATE DATABASE byobcomedyclubs`

* `knex migrate:latest`

* `knex seed:run`

#### Testing 
* `To test run npm test`

### API Endpoints
#### Cities
```
GET /api/v1/cities // get all cities
--> returns an array of city objects

GET /api/v1/cities/:id // get a specific city
--> returns array with specific city object

POST /api/v1/cities  // create a new city

PATCH /api/v1/cities/:id  // edit the cities visitor website

DELETE /api/v1/cities/:id  // delete a city
```
#### Comedy Clubs
```
GET /api/v1/comedy_clubs // get all comedy clubs
--> returns an array of all comedy club objects

GET /api/v1/comedy_clubs/:club_id  // get a specific comedy club
--> returns an array with a specific club object

GET /api/v1/cities/:city_id/comedy_clubs // gets all the clubs in a specific city
--> returns an array of club objects

POST /api/v1/cities/:city_id/comedy_clubs  // create a new comedy club

PATCH /api/v1/comedy_clubs/:club_id  // edit a comedy clubs rating

DELETE /api/v1/cities/:city_id/comedy_clubs/:club_id  // delete a specific comedy club

```

## Technologies Used
- Node.js
- Express
- Knex.js
- Heroku
- Mocha
- Chai 
- Chai-http

## Project Requirements
Project spec [link](http://frontend.turing.io/projects/build-your-own-backend.html).

Backend Checklist [link](http://frontend.turing.io/projects/byob/backend-feature-checklist.html).

## Database created and designed by Ben Hayek and Alex Rau.
