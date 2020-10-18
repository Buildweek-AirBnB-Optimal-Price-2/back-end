exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('amenity').del()
    .then(function () {
      // Inserts seed entries
      return knex('amenity').insert([
        // they include "safety amenities", I'm not going to
        {
          id: 1,
          amenity_name: "Essentials"
        },
        {
          id: 2,
          amenity_name: "Wifi"
        },
        {
          id: 3,
          amenity_name: "TV"
        },
        {
          id: 5,
          amenity_name: "Heat"
        },
        {
          id: 6,
          amenity_name: "Air Conditioning"
        },
        {
          id: 7,
          amenity_name: "Iron"
        },
        {
          id: 8,
          amenity_name: "Shampoo"
        },
        {
          id: 9,
          amenity_name: "Hair dryer"
        },
        {
          id: 10,
          amenity_name: "Breakfast, coffee, tea"
        },
        {
          id: 11,
          amenity_name: "Desk/workspace"
        },
        {
          id: 12,
          amenity_name: "Fireplace"
        },
        {
          id: 13,
          amenity_name: "Closet/drawers"
        },
        {
          id: 14,
          amenity_name: "Private entrance"
        },
      ]);
    });
};
