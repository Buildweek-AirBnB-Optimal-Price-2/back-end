const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {
  try {
    const results = await db(tableString).where(keyString, "like", `${value}%`);
    // if (results >= 1) {
      return results.length > 1 ? results : results[0];
    // } else {
      // return "...No results found"
    // };
  } catch (err) {
      return false;
  };
};