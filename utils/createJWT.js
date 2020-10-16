require("dotenv").config();
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const { username, password } = user;

  // we can do a db query for isRenter since username will be unique

  const payload = {
    username,
    password,
   }

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1d"
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}