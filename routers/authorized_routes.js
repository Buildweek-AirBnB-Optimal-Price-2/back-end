const router = require("express").Router()
const { find, findById, } = require("../models/index");

// how do I add a query to search for addresses of properties?
router.get("/:table/:id?", /* middleware, */ async (req, res, next) => {
  const { table, id } = req.params;
    
  try {
    let user;
    
    id ?
      user = await findById(table.toString(), id)
    : user = await find(table.toString());

    // if res.status defaults to 200 on a get req, do I really need to add it manually?
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

module.exports = router;