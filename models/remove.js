const db = require("../database/dbConfig");

module.exports = (tableString, id) => {
  try {
    return db(tableString).where({ id }).del();
  } catch (err) {
    console.log(err)
    return false;
  }
}