const router = require("express").Router()
const { find, findById, findBy } = require("../models/index");
const verify_token = require("../middleware/verify_token");

// how do I add a query to search for addresses of properties?
// rn I can't think of a use for searching by table and keyName --> UNLESS keyname(key_OR_id) could also be an id
router.get("/:table/:key_OR_id?/:value?", /*verify_token, */ async (req, res, next) => {
  
  const {table, key_OR_id, value} = req.params;
    
  try {
    
    let tableData;

    if (!key_OR_id && !value) {
      tableData = await find(table.toString())
    } else if (!value) {
      tableData = await findById(table.toString(), key_OR_id);
    } else {
      tableData = await findBy(table.toString(), key_OR_id.toString(), value);
    };
    
    res.send(tableData);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

module.exports = router;


    // const { table, id } = req.params;

    // let user;

    // tableData = await findBy(table.toString(), keyName.toString(), value);

    // id ?
    // console.log(id)
    //   // user = await findById(table.toString(), id)
    // : user = await find(table.toString());

    // if res.status defaults to 200 on a get req, do I really need to add it manually?
    // res.send(user);