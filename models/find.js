const db = require ("../database/dbConfig");
const format_return = require("../helpers/format_return");

// could I fit all of my find queries into this?
module.exports = async (tableString) => {
  try {
    if (tableString === "rental") {

      return format_return(tableString);

    } else {
      return db(tableString)
    }
  } catch (err) {
    console.log(err);
    return err;
  };
};