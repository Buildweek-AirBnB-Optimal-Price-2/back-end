
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("rental_amenity").del()
    .then(function () {
      // Inserts seed entries
      return knex('rental_amenity').insert([
        {
          id: 1,
          amenity_id: 1,
          rental_id: 1
        },
        {
          id: 2,
          amenity_id: 2,
          rental_id: 1
        },
        {
          id: 3,
          amenity_id: 3,
          rental_id: 1
        },
        {
          id: 4,
          amenity_id: 4,
          rental_id: 1
        },
        {
          id: 17,
          amenity_id: 5,
          rental_id: 1
        },
        {
          id: 5,
          amenity_id: 1,
          rental_id: 2
        },
        {
          id: 6,
          amenity_id: 2,
          rental_id: 2
        },
        {
          id: 7,
          amenity_id: 3,
          rental_id: 2
        },
        {
          id: 8,
          amenity_id: 4,
          rental_id: 2
        },
        {
          id: 9,
          amenity_id: 1,
          rental_id: 3
        },
        {
          id: 10,
          amenity_id: 2,
          rental_id: 3
        },
        {
          id: 11,
          amenity_id: 3,
          rental_id: 3
        },
        {
          id: 12,
          amenity_id: 4,
          rental_id: 3
        },
        {
          id: 13,
          amenity_id: 1,
          rental_id: 4
        },
        {
          id: 14,
          amenity_id: 2,
          rental_id: 4
        },
        {
          id: 15,
          amenity_id: 3,
          rental_id: 4
        },
        {
          id: 16,
          amenity_id: 4,
          rental_id: 4
        },
      ]);
    });
};
