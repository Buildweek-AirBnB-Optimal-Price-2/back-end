require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (user) => {
  // I believe this is all we need in the payload. 
  // If user is not a renter, they will not be able to add properties
  const payload = {
    username: user.username,
    isRenter: user.isRenter,
   }

   // .env is accessible, do I need to provide the secret?
  const secret = process.env.JWT_SECRET || "very secret thing";

  const options = {
    expiresIn: "1d"
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};