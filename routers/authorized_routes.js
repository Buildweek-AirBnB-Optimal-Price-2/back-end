const router = require("express").Router()
const { add,  find, findBy, findById, update, remove } = require("../models/");
const { check_rental_existence, verify_token } = require("../middleware");

// how do I add a query to search for addresses of properties?
// rn I can't think of a use for searching by table and keyName --> UNLESS keyname(key_OR_id) could also be an id
// to query strings, we could take a body and use that
router.get("/:table/:key_OR_id?/:value?", /*verify_token,*/ async (req, res, next) => {  // --> with this, we can just show each individual route in the documentation instead of this entire route
  
  // if no value param, key_OR_id should be an id
  const {table, key_OR_id, value} = req.params;
  // const { street_address } = req.body;
  const [searchKey] = Object.keys(req.body);
  const [searchFor] = Object.values(req.body);

  // BIG ISSUE if client queries with string --> but if we require conversion to a number for the state, city, address (coordinates) then it will be fine
    
  try {
    
    let tableData;

    // is this bad way to do this? --> we can search for absolutely anything with this
    if (searchKey && searchFor) {
      console.log("here i am")
      tableData = await findBy(table.toString(), searchKey.toString(), searchFor.toString());
    } else if (!key_OR_id && !value) {
      // finds all table data
      tableData = await find(table.toString())
    } else if (!value) {
      // finds specified id in table
      tableData = await findById(table.toString(), key_OR_id);
    } else {
      console.log("me")
      // finds specified table data matching specified key and value
      tableData = await findBy(table.toString(), key_OR_id.toString(), value.toString()); // add errors if the request returns nothing
    };
    // console.log(tableData.length);
    res.send(tableData);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

router.post("/:table", verify_token, check_rental_existence, async (req, res, next) => { // also need a verify permission
  
  // only want renters to be able to add to the rental table, admins can add to anything, middleware would be good for this reason
  // additionally, we need to check that the rental does not already exist
  let { id, user_permission } = req.decodedToken; // --> need to add user id to payload, however, to make this more reusable I think I'd want the client to take care of it (same goes for permission?)
  const { table } = req.params;
  // rn I'm just using this to add rentals, but will need to change this name to reflect the general nature of the route
  const newRental = req.body;
  const permitted = user_permission === 2 || user_permission === 3;
  // const permitted = user_permission => user_permission === 2 || user_permission === 3; // unrelated to this, but how could I prevent a user from signing up as an admin?

  try {

    if (permitted) {

      newRental.renter_id = id;
      const additionalRental = await add(table.toString(), newRental);

      if (additionalRental) { // SQLite is checking the request body has all of the required fields --> if there's an err, that is thrown by our models
        res.status(201).json(additionalRental);
      } else {
        res.status(400).json({
          // will also throw if the table already exists rn
          message: "There are missing fields in your request"
        });
      };
    } else {
      res.status(401).json({
        message: "Invalid permissions"
      });
    };
  } catch (err) {
    res.status(500).json({
      message: "There was a server error fulfilling your request"
    });
  };
});

router.put("/:table/:id", verify_token, async (req, res, next) => {
  const { table, id } = req.params;
  const changes = req.body;

  try {
    const exists = await findById(table.toString(), id);

    if (exists) {
      const applyChanges = await update(table.toString(), id, changes);
      res.status(200).json(applyChanges);
    } else {
      res.status(400).json({
        msg: "Idk"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "There was a server error fulfilling your request"
    })
  };
});

router.delete("/:table/:id", verify_token, async (req, res, next) => {
  const { table, id } = req.params;
  // if user is deleting a rental, their id needs to match renter_id
  // I need the item id, user id, and the id from the token to ensure they are allowed to act
  // const { user_permission } = req.decodedToken;
  const user_id = req.decodedToken.id;

  // to delete, the user is requered to either be an admin or to have a matching id to the item they are trying to delete
  // const matches  = user_id === id && user_permission !== 3;
  try {
    const [itemExists]  = await findBy(table.toString(), "id", id);
    const { renter_id } = itemExists;

    if (itemExists) {
      // const exists = await findById(table.toString(), id);
      if (user_id === renter_id) {
        const removed = await remove(table.toString(), id);
        res.status(200).json({
          msg: "Item successfully deleted"
        });
      } else {
        res.status(401).json({
          msg: "You are not authorized to delete this data"
        })
      }
    } else {
      res.status(500).json({
        msg: "The item does not exist"
      })
    }

  } catch (err) {
    res.status(500).json({
      err: err.message,
      msg: "There was a server error fulfilling your request"
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