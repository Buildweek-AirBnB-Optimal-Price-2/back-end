const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {
  
  try {
    let rental

    if (keyString && value) {
      rental = await db(tableString).where(keyString, value);
    } else if (keyString && !value) {
      rental = await db(tableString).where("id", keyString);
    } else {
      rental = await db(tableString);
    }

    rental.forEach(r => {
      return r.amenity = [];
    });
  
    const typeArr = await db("rental_type");
  
    rental.forEach(r => {
      typeArr.forEach(t => {
        if (r.type === t.id) {
          return r.type = t.type;
        };
      });
    });
  
    const amenity = await db
      .select("ra.id", "ra.rental_id", "a.amenity_name")
      .from("amenity as a")
      .join("rental_amenity as ra", "ra.amenity_id", "=", "a.id");

    const amenityArr = amenity;
  
    rental.forEach(r => {
      amenityArr.forEach(amenity => {
        if (r.id === amenity.rental_id) {
          let {amenity_name, id} = amenity;
          r.amenity.push({ amenity_name, id });
        };
      })
    });

    return rental.length > 1 ? rental : rental[0];

  } catch (err) {
    console.log(err);
  };
};