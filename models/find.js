const db = require ("../database/dbConfig");

// could I fit all of my find queries into this?
module.exports = async (tableString) => {
  try {
    if (tableString === "rental") {
      // const amenityArray = await db("rental_amenity").where("rental_id", "=", 1);
      // const amenity = await db("rental_amenity").where("rental_id", "=", 1);

      let rental = await db("rental")
      rental.forEach(r => {
        return r.amenity = [];
      });
      
      const amenity = await db
        .select("ra.id", "ra.amenity_id", "ra.rental_id", "a.amenity_name")
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
      // console.log(rental)
      return rental;
    } else {
      return db(tableString)
    }
  } catch (err) {
    // we need to throw an err if tableString doesn't exist -- if client does not specify table string will it return []?
    console.log(err);
    return err;
  };
};

// in the above I want to use a left join, I just can't make it return what I need it to --> an array of amenities
// it returns the amenities correctly, but returns the entire object every time with each additional amenity

/* // --> temporarily abandoned <-- \\
await db
        .select("*", "amenity.amenity_name", "rental_amenity.id as amenity_id")
        .from("rental")
        .leftJoin("rental_amenity", "rental_amenity.amenity_id", "=", "amenity.id")
*/