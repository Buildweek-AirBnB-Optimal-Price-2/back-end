const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {
  // would it make it easier if I converted these to strings here?
  console.log(tableString)
  console.log(keyString)
  console.log(value)
  try {

    if (tableString === "rental") {

      let rental = await db(tableString).where(keyString, value);
      rental.forEach(r => {
        return r.amenity = [];
      });
      
      const amenity = await db
        .select("ra.id", /*"ra.amenity_id",*/ "ra.rental_id", "a.amenity_name")
        .from("amenity as a")
        .join("rental_amenity as ra", "ra.amenity_id", "=", "a.id")
      // console.log("WHY IS EVERY 4TH ONE MISSING", amenity);

      const amenitiesArr = amenity;
      console.log("WHY IS EVERY 4TH ONE MISSING", amenitiesArr);
    
      // THIS WORKS --> make it work how it's supposed to, not this mess
      rental.forEach(r => {
        amenitiesArr.forEach(amenity => {
          if (r.id === amenity.rental_id) {
            return r.amenity.push({amenity_name: amenity.amenity_name, amenity_id: amenity.id});
          }
        })
      })
      console.log(rental)
      return rental;

    } else {
      // if value is undefined it will still work?
      return await db(tableString).where(keyString, value); // took off .first();
    }
  } catch (err) {
    return false;
  };
};

// module.exports = async (tableString, filter) => {
//   try {
//     return db(tableString).where(filter).first();
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }
