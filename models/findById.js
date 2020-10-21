const db = require("../database/dbConfig");

// we can find any element in any table that has an id
module.exports = async (tableString, id) => {
  try {
    if (tableString === "rental") {

      let rental = await db(tableString).where({ id })
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
      return db(tableString).where({ id, }).first();
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}