const db = require("../database/dbConfig");
const findById = require("./findById"); // I SPENT AT LEAST ONE HOUR FIXING THIS BC I WRAPPED IT IN BRACES >:(

// this is where typescript would be nice and I could do table: String -- or something like that
module.exports = async (tableString, obj) => {
  try {
    // I'm not sure if this will work --> id seems very specific and I want it to work with adding anything
    const [id] = await db(tableString).insert(obj, "id");
    // console.log(findById(tableString, id));
    const newUser = await findById(tableString, id);
    console.log(newUser);
    return newUser;
  } catch (err) {
    console.log("ADD ERR: ", err);
    throw err;
  };
};