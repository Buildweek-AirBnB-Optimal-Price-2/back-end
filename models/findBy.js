const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {

  try {

    if (tableString === "rental") {

      let rental = await db(tableString).where(keyString, value);
      rental.forEach(r => {
        return r.amenity = [];
      });

      let typeArr = await db("rental_type");
        // .from("rental_type as rt");

      console.log(typeArr);

      rental.forEach(r => {
        typeArr.forEach(t => {
          if (r.type === t.id) {
            return r.type = t.type;
          }
        })
      })

      const amenity = await db
        .select("ra.id", "ra.rental_id", "a.amenity_name")
        .from("amenity as a")
        .join("rental_amenity as ra", "ra.amenity_id", "=", "a.id")

      const amenitiesArr = amenity;
    
      // ok, simple issue. We skipped an index number in our seed and I think it threw the whole thing off
      rental.forEach(r => {
        amenitiesArr.forEach(amenity => {
          if (r.id === amenity.rental_id) {
            r.amenity.push({amenity_name: amenity.amenity_name, amenity_id: amenity.id});
          }
        })
      })

      return rental;

    } else {
      return await db(tableString).where(keyString, value);
    }
  } catch (err) {
    console.log(err);
    return false;
  };
};