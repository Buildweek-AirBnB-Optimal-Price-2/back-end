const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {
  // would it make it easier if I converted these to strings here?
  try {
    // if value is undefined it will still work?
    return await db(tableString).where(keyString, value); // took off .first();
  } catch (err) {
    return false;
  };
};

// module.exports = async (tableString, filter) => {
//   try {
//     return db(tableString).where(filter).first();
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }
