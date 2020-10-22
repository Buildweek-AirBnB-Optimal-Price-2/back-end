exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user").del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1, 
          name: "user",
          user_permission: 1,
          email: "user1@email.com", 
          username: "user1", 
          password: "password"
        },
        {
          id: 2, 
          name: "renter",
          user_permission: 2,
          email: "renter1@email.com", 
          username: "renter1", 
          password: "password"
        },
        {
          id: 5,
          name: "admin",
          user_permission: 3,
          email: "admin@email.com",
          username: "admin1",
          password: "password"
        }
      ]);
    });
};
