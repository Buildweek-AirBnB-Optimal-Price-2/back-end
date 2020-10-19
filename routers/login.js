const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { findBy } = require("../models/index");

// middleware
const { test_verification } = require("../middleware/index");

// token
const createJWT = require("../utils/createJWT");

router.post("/", test_verification, async (req, res, next) => {
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