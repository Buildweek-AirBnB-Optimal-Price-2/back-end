exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("permission").del()
    .then(function () {
      // Inserts seed entries
      return knex("permission").insert([
        {
          id: 1,
          permission_name: "user"
        },
        {
          id: 2,
          permission_name: "renter"
        },
        {
          id: 3,
          permission_name: "admin"
        }
      ]);
    });
};
