const cities = require('../../../data/citiesdata.js')


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comedy_clubs').del()
    .then(() => knex('cities').del())
    .then(() => {
      return Promise.all([
        knex('cities').insert(
          cities.map((city) => {
            return { city: city.city, state: city.state, primary_airport: city.primary_airport, population: city.population, tourism_website: city.tourism_website }
          }, 'id')
        )
        .then(city => {
          return knex('comedy_clubs').insert([
            { name: 'Denver Comedy Club', street_address: '123 Denver St.', zip_code: 80013, rating: 5, city_id: 92 },
            { name: 'Comedy Works', street_address: '321 Not Denver St.', zip_code: 80212, rating: 4, city_id: 92 }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
