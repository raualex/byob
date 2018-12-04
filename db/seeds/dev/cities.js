
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comedy_clubs').del()
    .then(() => knex('cities').del())
    .then(() => {
      return Promise.all([
        knex('cities').insert({
          city: 'Denver', state: 'CO', primary_airport: 'Denver International Airport', population: '1,000,000', tourism_website: 'www.denver.com'
        }, 'id')
        .then(city => {
          return knex('comedy_clubs').insert([
            { name: 'Denver Comedy Club', street_address: '123 Denver St.', zip_code: '80013', rating: 5, city_id: city[0] },
            { name: 'Comedy Works', street_address: '321 Not Denver St.', zip_code: '80212', rating: 4, city_id: city[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
