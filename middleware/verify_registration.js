const db = require("../database/dbConfig");
const { findBy } = require("../models/index");

module.exports = async (req, res, next) => {
  const {email, username, password} = req.body;

  // perhaps could use joi to verify email is of type email?

  try {
    if (email && username && password) {
        const username_exists = await findBy("user", {username});
        const email_exists = await findBy("user", {email});
        if (username_exists) {
          res.status(400).json({
            msg: "Account with username already exists"
          });
          throw new Error("Account with username already exists");
        } else if (email_exists) {
          res.status(400).json({
            msg: "Account with email already exists"
          });
          throw new Error("Account with email already exists")
        } else {
          next();
        }
    } else {
      res.status(400).json({
        msg: "Please provide email, username, and password"
      })
      throw new Error("Please provide email, username, and password");
    };
  } catch (err) {
    console.log(err);
    return err;
  };
};