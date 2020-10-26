const db = require("../database/dbConfig");

// formats what the client recieves so that type is given as a string rather than a number and attaches amenity array
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

    // add amenity array w/ key amenity to each rental object
    rental.forEach(r => {
      return r.amenity = [];
    });
  
    const typeArr = await db("rental_type");
  
    // translates type of each rental from int to string --> need to add a helpter in add that will translate it back
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
  
    // adds amenity information to each rental 
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