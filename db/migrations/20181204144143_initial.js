
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('cities', function(table) {
        table.increments('id').primary();
        table.string('city');
        table.string('state');
        table.string('primary_airport');
        table.integer('population').unsigned();
        table.string('tourism_website');
  
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable('comedy_clubs', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('street_address');
        table.integer('zip_code');
        table.integer('rating');
        table.integer('city_id').unsigned()
        table.foreign('city_id')
          .references('cities.id');
  
        table.timestamps(true, true);
      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('comedy_clubs'),
      knex.schema.dropTable('cities')
    ]);
  };
