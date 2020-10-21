const db = require("../database/dbConfig");
const format_return = require("../helpers/format_return");

// we can find any element in any table that has an id
module.exports = async (tableString, id) => {
  try {
    if (tableString === "rental") {

      return format_return(tableString, id);

    } else {
      return db(tableString).where({ id, }).first();
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}