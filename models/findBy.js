const db = require("../database/dbConfig");
const format_return = require("../helpers/format_return");

module.exports = async (tableString, keyString, value) => {

  try {

    if (tableString === "rental") {

      return format_return(tableString, keyString, value);

    } else {
      return await db(tableString).where(keyString, value);
    }
  } catch (err) {
    console.log(err);
    return false;
  };
};