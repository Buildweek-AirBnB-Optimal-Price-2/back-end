
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rental_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('rental_type').insert([
        // there's a LOT of sub-types on abnb, not gonna include those in 
        {
          id: 1,
          type: "Apartment"
        },
        {
          id: 2,
          type: "House"
        },
        {
          id: 3,
          type: "Secondary Unit"
        },
        {
          id: 4,
          type: "Unique Space"
        },
        {
          id: 5,
          type: "Bed and Breakfast"
        },
        {
          id: 6,
          type: "Botique Hotel"
        }
      ]);
    });
};
