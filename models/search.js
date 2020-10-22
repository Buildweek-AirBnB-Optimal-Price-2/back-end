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

/* 
TODO

  1. Add conversion from address to long/lat
  2. If user doesn't supply zip code, I could search address and apply it myself?

*/