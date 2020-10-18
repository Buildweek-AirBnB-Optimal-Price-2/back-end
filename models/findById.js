const db = require("../database/dbConfig");

// we can find any element in any table that has an id
module.exports = async (tableString, id) => {
  try {
    return db(tableString).where({ id, }).first();
  } catch (err) {
    console.log(err);
    return err;
  }
}