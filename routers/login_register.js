const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { add, findBy } = require("../models/index");

// middleware
const { verify_registration, verify_login, test_verification } = require("../middleware/index");

// token
const createJWT = require("../utils/createJWT");

// I want middleware to verify the user's req
router.post("/register", test_verification, async (req, res, next) => {
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


router.post("/login", test_verification, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await findBy("user", {username});
    
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createJWT(user);
      res.status(200).json({
        msg: `Welcome back ${user.username}!`,
        token: token
      });
    } else {
      res.status(401).json({
        err: "Invalid credentials"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "Server error fulfilling request"
    });
  };
})

module.exports = router;