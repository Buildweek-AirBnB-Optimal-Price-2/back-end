const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { add } = require("../models/index");

// middleware
// const verify_token = require("../middleware/verify_token") // --> this is not exported yet
// const verify_credentials = require("../middleware/verify_credentials") // --> this does not exist yet, we need to verify username and password are correct length, that both are included, on register, we need to verify email/password are provided, username does not already exist, etc.
const verify_registration = require("../middleware/verify_registration");

// token
const createJWT = require("../utils/createJWT");

// I want middleware to verify the user's req
router.post("/register", verify_registration, async (req, res, next) => {
  const credentials = req.body;
  console.log("CREDENTIALS: ", credentials);

  try {
    const hash = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hash;
    console.log("HASH: ", hash);

    const user = await add("user", credentials);
    console.log("USER: ", user);
    const token = createJWT(user);
    console.log(token)
    res.status(201).json({
      data: user,
      token
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error fulfilling request"
    });
  };
});


// can I add middleware that will automatically log a user in if they have a token? --> that would be up to the front end to check
router.post("/login", /* middleware, */ async(req, res, next) => {
  try {
    
  } catch (err) {

  };
})

module.exports = router;