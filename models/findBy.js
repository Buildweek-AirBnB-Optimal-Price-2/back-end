const db = require("../database/dbConfig");

module.exports = async (tableString, keyString, value) => {
  try {
    return db(tableString).where(keyString, ">=" ,value);
  } catch (err) {
    console.log(err);
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
