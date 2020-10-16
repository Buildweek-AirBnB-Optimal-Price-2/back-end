const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = require("express").Router();

// middleware
// const verify_token = require("../middleware/verify_token") // --> this is not exported yet
// const verify_credentials = require("../middleware/verify_credentials") // --> this does not exist yet, we need to verify username and password are correct length, that both are included, on register, we need to verify email/password are provided, username does not already exist, etc.

// token
const createJWT = require("../utils/createJWT");

router.post("/register", /* middleware, */ async (req, res, next) => {
  
});


// can I add middleware that will automatically log a user in if they have a token?
router.post("/login", /* middleware, */ async(req, res, next) => {

})

module.exports = router;