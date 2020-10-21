exports.up = function(knex) {
  return knex.schema // will prob need to add more to this, but idk what else yet
    .createTable("rental", tbl => {
      tbl.increments("id");
      tbl // this is the id of the owner
        .integer("renter_id")
        .unsigned()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
        // add "title" column
        // add "location" column
      tbl
        .string("title", 255)
        .notNullable();
      tbl
        .string("location", 255)
        .notNullable();
      tbl
        .integer("type")
        .references("rental_type.id")
        .onDelete("CASCADE") // since this is referencing rental_type, wouldn't that mean rental_type is the parent?
        .onUpdate("CASCADE") // will need to make sure this is the right way to do it -- tired
        .notNullable()
      tbl
        .string("country", 255)
        .defaultTo("USA")
        .notNullable();
      tbl
        .string("state")
        .notNullable();
      tbl
        .string("city")
        .notNullable();
      tbl
        .string("street_address", 255)
        .unique()
        .notNullable();
      tbl
        .integer("zip")
      tbl
        .integer("bedrooms") // change to bedrooms
        .notNullable(); // would probably be a good idea to put some kind of cap on this
      tbl
        .integer("beds")
        .notNullable();
      tbl
        .float("baths")
        .notNullable();
      tbl
        .integer("guests", 255) // change to guests
        .notNullable(); // same^
      tbl
        .text("description")
        .notNullable();
      tbl
        .string("featuredImg", 255)
    })

    .createTable("amenity", tbl => {
      tbl.increments("id");
      tbl
        .string("amenity_name", 255)
        .unique()
        .notNullable();
    })

    .createTable("rental_amenity", tbl => { // no need for a number here
      tbl.increments("id") // in case they need to remove the amenity
      tbl
        .integer("amenity_id")
        .unsigned()
        .references("amenity.id")
        .onDelete("CASCADE") // we want this row deleted if the amenity is removed, it won't affect the rental
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("rental_id")
        .unsigned()
        .references("rental.id")
        .onDelete("CASCADE") // if property is deleted, we want all associated amenities deleted as well
        .onUpdate("CASCADE")
        .notNullable();
      // tbl // --> was going to add all the necessary information here, but instead, I'll just query it in a model(?)
      //   .string("amenity_name")
      //   .unsigned()
      //   .references()
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE")
      //   .notNullable();
    })

    .createTable("rating", tbl => {
      tbl.increments("id")
      tbl // I figure we can add a 5 star rating system (may be useful for ds in ranking optimal price?), maybe we'll never use it
        .integer("rating", 5) // idk if this will put a cap of 5 on it, but I'd like to do that
        .unsigned() // can't be 0, right?
      tbl
        .integer("rental_id")
        .unsigned()
        .references("rental.id")
        .onDelete("CASCADE") // property deleted? delete ratings
        .onUpdate("CASCADE")
        .notNullable(); // if you're going to add a rating, it can't be empty(?)
      tbl
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
    })

    .createTable("rental_type", tbl => {
      tbl.increments("id")
      tbl
        .string("type")
        .unique()
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("rental")
    .dropTableIfExists("amenity")
    .dropTableIfExists("rental_amenity")
    .dropTableIfExists("rating")
    .dropTableIfExists("rental_type");
};
