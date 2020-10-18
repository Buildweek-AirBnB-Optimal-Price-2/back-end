const db = require ("../database/dbConfig");

// could I fit all of my find queries into this?
module.exports = async (tableString) => {
  try {
    return db(tableString)
  } catch (err) {
    // we need to throw an err if tableString doesn't exist
    console.log(err);
    return err;
  };
};