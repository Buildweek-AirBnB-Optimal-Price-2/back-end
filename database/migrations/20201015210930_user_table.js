exports.up = function(knex) {
  return knex.schema.createTable("user", tbl => {
    tbl.increments("id");
    tbl.boolean("isRenter").defaultTo("false");
    tbl
      .string("email", 255)
      .unique()
      .notNullable();
    tbl
      .string("username", 255)
      .unique()
      .notNullable()
    tbl
      .string("password", 255)
      .notNullable()
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
