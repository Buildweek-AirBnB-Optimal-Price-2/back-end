const db = require("../database/dbConfig");

// we can find any element in any table that has an id
module.exports = async (tableString, id) => {
  try {
    // return db(tableString).where({ id, }).first();
    return db(tableString).where({ id, });
  } catch (err) {
    // again, we want to return an error if table or id doesn't exist
    console.log(err);
    return err;
  }
}