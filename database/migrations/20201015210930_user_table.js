exports.up = function(knex) {
  return knex.schema
    .createTable("user", tbl => {
      tbl.increments("id");
      // tbl.boolean("isRenter").defaultTo("false");
      tbl
        .integer("user_permission") // should I make this the string val? no, when registering, it's easier to use an int --> less possibility of a misspelling err(?)
        .defaultTo(3)
        .unsigned()
        .notNullable()
        .references("permission.id")
        .onDelete("RESTRICT") // causes delete of parent row to fail
        .onUpdate("CASCADE")  // updating parent row updates child row
      tbl
        .string("email", 255)
        .unique()
        .notNullable();
      tbl
        .string("username", 255)
        .unique()
        .notNullable()
      tbl
        .string("password", 255) // if password was required to be unique, we'd be doing the hackers' work for them
        .notNullable()
  })  
  .createTable("permission", tbl => {
    tbl.increments("id");
    tbl.string("permission_name", 255);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("permission");
};
