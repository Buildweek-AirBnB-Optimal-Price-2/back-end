exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rental').del()
    .then(function () {
      // Inserts seed entries
      // perhaps should add dates rented so users can specify the dates they need and only rentable properties are shown
      return knex('rental').insert([
        {
          id: 1,
          renter_id: 2,
          type: 1,
          state: "NY",
          city: "Brooklyn",
          street_address: "140 Grove St",
          // no zip given --> we will need zip for coordinates as well as to validate existence
          rooms: 2,
          bathrooms: 1,
          guest_limit: 4,
          description: "A nice, third story apartment building with a beautiful view of the city"
        },
        {
          id: 2,
          renter_id: 2,
          type: 2,
          state: "NY",
          city: "New York",
          // zip: 10022
          street_address: "420 E 51st St",
          rooms: 4,
          bathrooms: 2.5,
          guest_limit: 6,
          description: "This is a large house with a private back yard, great for BBQs or just enjoying the weather"
        },
        {
          id: 3,
          renter_id: 2,
          type: 3,
          state: "NY",
          city: "New York",
          street_address: "125 87th St",
          rooms: 1,
          bathrooms: 1,
          guest_limit: 2,
          description: "Not sure what a secondary space is, but that's what you're getting!"
        },
        {
          id: 4,
          renter_id: 2,
          type: 4,
          state: "NY",
          city: "Ridgewood",
          street_address: "2017 Palmetto St",
          rooms: 2,
          bathrooms: 1,
          guest_limit: 4,
          description: "Once an art studio, now a unique place to stay right in the middle of town. If you like high ceilings, this is your place"
        },
        {
          id: 5,
          renter_id: 2,
          type: 5,
          state: "NY",
          city: "Brooklyn",
          street_address: "82 Pierrepont St",
          rooms: 1,
          bathrooms: 1,
          guest_limit: 2,
          description: "If you like the smell of coffee and pancakes in the morning, this is your home away from home"
        }
      ]);
    });
};
