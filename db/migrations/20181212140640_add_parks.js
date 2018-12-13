exports.up = function(knex, Promise) {
  return knex.schema.table("cities", table => {
    table.string("theme_parks");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("cities", table => {
    table.dropColumn("theme_parks");
  });
};
