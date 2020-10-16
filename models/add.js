const db = require("../database/dbConfig");

// this is where typescript would be nice and I could do table: String -- or something like that
module.exports = async (tableString, obj) => {
  try {
    // I'm not sure if this will work --> id seems very specific and I want it to work with adding anything
    const [id] = await db(tableString).insert(obj, "id");
  } catch (err) {
    throw err;
  };
};