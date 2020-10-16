exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user").del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1, 
          isRenter: false,
          email: "user1@email.com", 
          username: "user1", 
          password: "password"
        },
        {
          id: 2, 
          isRenter: true,
          email: "renter1@email.com", 
          username: "renter1", 
          password: "password"
        }
      ]);
    });
};
