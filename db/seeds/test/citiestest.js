
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comedy_clubs').del()
    .then(() => knex('cities').del())
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {id: 1, city: 'Denver', state: 'CO', primary_airport: 'DIA', population: 100000, tourism_website: 'www.denver.com'},
        {id: 2, city: 'New York City', state: 'NY', primary_airport: 'LaGuardia', population: 100000, tourism_website: 'www.nyc.com'},
        {id: 3, city: 'Austin', state: 'TX', primary_airport: 'TIA', population: 100000, tourism_website: 'www.austin.com'},
      ])
      .then(city => {
        return knex('comedy_clubs').insert([
          { id: 1, name: 'Denver Comedy', street_address: '123 Denver St.', zip_code: 090909, rating: 4, city_id: 1 },
          { id: 2, name: 'Other Denver Comedy', street_address: '456 Denver St.', zip_code: 808080, rating: 3, city_id: 1 },
          { id: 3, name: 'NYC Comedy', street_address: '500 NYC St.', zip_code: 000001, rating: 4, city_id: 2 },
          { id: 4, name: 'Austin Comedy', street_address: '1000 Austin St.', zip_code: 765432, rating: 5, city_id: 3 },
          { id: 5, name: 'Texas Comedy', street_address: '12 Texas St.', zip_code: 777733, rating: 3, city_id: 3 },
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    });
};
