// may need this --> require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; /* || "very secret thing" */
console.log(secret);

// this file is used to verify the user has a valid jwt, allowing them restricted access

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {

        }
      })
    }

  } catch (err) {

  }
}