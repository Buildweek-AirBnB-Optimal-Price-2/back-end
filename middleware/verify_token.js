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
          res.status(401).json({
            err: err.message,
            msg: "Invalid token"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({
        err: err.message,
        msg: "Please log in or register"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "Server error fulfilling request"
    })
  }
}