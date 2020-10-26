const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { add } = require("../models/index");

// middleware
const { verify_login_register } = require("../middleware/index");

// token
const createJWT = require("../utils/createJWT");

router.post("/", verify_login_register, async (req, res, next) => {
  const credentials = req.body;

  try {
    const hash = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hash;

    const user = await add("user", credentials);
    const token = createJWT(user);

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