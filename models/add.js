const db = require("../database/dbConfig");
const findById = require("./findById"); // I SPENT AT LEAST ONE HOUR FIXING THIS BC I WRAPPED IT IN BRACES >:(

// this is where typescript would be nice and I could do table: String -- or something like that
// HEY, this is supposed to be an add function where you can add ANYTHING, move delete to the registration
// now, we have a VERY generic model for adding anything
module.exports = async (tableString, obj) => {
  try {
    // I'm not sure if this will work --> id seems very specific and I want it to work with adding anything
    // this returns an array with an object inside of it, that is why we are destructuring the array?
    const [id] = await db(tableString).insert(obj, "id");
    // console.log(findById(tableString, id));
    const addedObj = await findById(tableString, id);
    // I think it is a bad idea to return a user their password, I don't think I want anyone to ever see that
    // const { user_permission, email, username } = newUser; 
    // delete newUser.password;
    // return { id, user_permission, email, username };
    return addedObj;
  } catch (err) {
    console.log("ADD ERR: ", err);
    throw err;
  };
};