const { findBy } = require("../models/index");

module.exports = async (req, res, next) => {

  /* I think this is bad bc each piece of middleware is supposed to do ONE thing and by trying to make it 
  all happen in one middleware, I'm making it unnecessarily complicated */
  // also, is there another way to do this besides another middleware? It looks horrific...
  const { email, username, password, user_permission } = req.body;
  const url = req.url;
  const register  = "/register";
  
  try {
    if (!username || !password) {
      res.status(400).json({
        err: "Please provide username and password"
      });
      throw new Error("Please provide username and password");
    } else if (url !== register) {
      next();
    }
    if (url === register && !email) {
      res.status(400).json({
        msg: "Please provide email address --> test_ver"
      })
      throw new Error("Please provide email address --> test_ver");
      // res.end();
    } else if (url === register && !user_permission) {
      res.status(400).json({
        msg: "Please provide a user permission"
      })
      throw new Error("Please provide a user permission")
    }

    if (url === register) {
      if (email) {
        const username_exists = await findBy("user", {username});
        const email_exists = await findBy("user", {email});
        if (username_exists) {
          console.log(username);
          console.log(username_exists);
          res.status(400).json({
            msg: "Account with username already exists"
          });
          throw new Error("Account with username already exists");
        } else if (email_exists) {
          res.status(400).json({
            msg: "Account with email already exists"
          })
          throw new Error("Account with email already exists");
        }
      } else {
        res.status(400).json({
          msg: "Please provide email address"
        });
        throw new Error("Please provide email address")
      }
      
      next();
    }
  } catch (err) {
    console.log(err);
    return err;
  };
};
