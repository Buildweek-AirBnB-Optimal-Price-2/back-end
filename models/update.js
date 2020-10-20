const db = require("../database/dbConfig");
const findById = require("./findById");

module.exports = async (tableString, id, changes) => {
  console.log(tableString);
  const updated = await db(tableString).update(changes).where({ id });
  return await findById(tableString, id);
};