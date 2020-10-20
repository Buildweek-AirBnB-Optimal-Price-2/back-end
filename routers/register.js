const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { add } = require("../models/index");

// middleware
const { verify_registration, verify_login, test_verification } = require("../middleware/index");

// token
const createJWT = require("../utils/createJWT");

// I want middleware to verify the user's req
router.post("/", test_verification, async (req, res, next) => {
  const credentials = req.body;

  try {
    const hash = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hash;

    const user = await add("user", credentials);
    const token = createJWT(user);
    // this is a specific route for registering users, so it makes sense to expect a password 
    delete user.password;

    res.status(201).json({
      user: user,
      token
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error fulfilling request"
    });
  };
});

module.exports = router;