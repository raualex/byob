const cities = require("../../../data/citiesdata.js");
const club = require("../../../data/comedy_clubs.js");

const createCities = (knex, city) => {
  return knex("cities")
    .insert(
      {
        city: city.city,
        state: city.state,
        primary_airport: city.primary_airport,
        population: city.population,
        tourism_website: city.tourism_website,
        theme_parks: city.theme_parks
      },
      "id"
    )
    .then(cityIds => {
      let clubPromises = club[city.city].map(clubs => {
        return newClubs(knex, {
          name: clubs.name,
          street_address: clubs.street_address,
          zip_code: clubs.zip_code,
          rating: clubs.rating,
          city_id: cityIds[0]
        });
      });
      return Promise.all(clubPromises);
    });
};

const newClubs = (knex, club) => {
  return knex("comedy_clubs").insert(club);
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log(cities);
  return knex("comedy_clubs")
    .del()
    .then(() => knex("cities").del())
    .then(() => {
      let cityPromises = cities.map(city => {
        return createCities(knex, city);
      });
      return Promise.all(cityPromises);
    })
    .then(() => console.log("Seeding complete!"))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
