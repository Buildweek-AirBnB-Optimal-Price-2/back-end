exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user").del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1, 
          user_permission: 1,
          email: "user1@email.com", 
          username: "user1", 
          password: "password"
        },
        {
          id: 2, 
          user_permission: 2,
          email: "renter1@email.com", 
          username: "renter1", 
          password: "password"
        },
        {
          id: 5,
          user_permission: 3,
          email: "admin@email.com",
          username: "admin1",
          password: "password"
        }
      ]);
    });
};
