const db = require ("../database/dbConfig");

// could I fit all of my find queries into this?
module.exports = async (tableString) => {
  try {
    return db(tableString)
  } catch (err) {
    // we need to throw an err if tableString doesn't exist -- if client does not specify table string will it return []?
    console.log(err);
    return err;
  };
};