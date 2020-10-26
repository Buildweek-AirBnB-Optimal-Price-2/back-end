// may need this --> require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "very secret thing";  //<-------- THIS WAS THE ISSUE!!!!!!!!!! WOOOOO

// this file is used to verify the user has a valid jwt, allowing them restricted access

module.exports = (req, res, next) => {
  try {

    // if (process.env.DB_ENV === "testing") next();

    const token = req.headers.authorization

    // console.log("verify_token", token);
    // console.log("verify_token", req.headers);

    // THE ISSUE WITH THE TESTING --> jwt.verify is not decoding the token!!!
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ // should I change this to 403 - forbidden?
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
        // will also throw if the table already exists rn
        err: "Missing credentials, please log in or register"
      })
    }
  } catch (err) {
    res.status(500).json({
      msg: "Server error fulfilling request"
    })
  }
}