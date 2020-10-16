const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { add, findBy } = require("../models/index");

// middleware
const verify_registration = require("../middleware/verify_registration");
const verify_login = require("../middleware/verify_login");

// token
const createJWT = require("../utils/createJWT");

// I want middleware to verify the user's req
router.post("/register", verify_registration, async (req, res, next) => {
  const credentials = req.body;

  try {
    const hash = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hash;

    const user = await add("user", credentials);
    const token = createJWT(user);

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


router.post("/login", verify_login, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const [user] = await findBy("user", {username});
    
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createJWT(user);
      res.status(200).json({
        msg: "Welcome back",
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