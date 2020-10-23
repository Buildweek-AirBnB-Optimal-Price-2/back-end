const router = require("express").Router()
const { add,  find, findBy, findById, update, remove, search } = require("../models/");
const { check_rental_existence, verify_token } = require("../middleware");
const {default: Geocode, enableDebug} = require("react-geocode");
const { default: Axios } = require("axios");


// GOOGLE API KEY: // AIzaSyBm178Zk47K2cVPIOZtoDLsvA4o2PebdIs

// this is the old key
// const API_KEY = "AIzaSyBm178Zk47K2cVPIOZtoDLsvA4o2PebdIs";

// new key
const API_KEY = "AIzaSyDIy0LNbmNJvcSJ2u1CMglEpGTA4yqYHlY";


// how do I add a query to search for addresses of properties?
// rn I can't think of a use for searching by table an;d keyName --> UNLESS keyname(key_OR_id) could also be an id
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
      tableData = await search(table.toString(), searchKey.toString(), searchFor.toString());
    } else if (!key_OR_id && !value) {
      tableData = await find(table.toString())
    } else if (!value) {
      tableData = await findById(table.toString(), key_OR_id);
    } else {
      tableData = await findBy(table.toString(), key_OR_id.toString(), value.toString()); // add errors if the request returns nothing
    };

    // console.log(tableData);
    
    // let lat_long = {};

    Axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${tableData.street_address}+${tableData.city}+${tableData.state}&key=${API_KEY}`)
      .then((res) => {

        const lat = res.data.results[0].geometry.location.lat;
        const lng = res.data.results[0].geometry.location.lng;
        // const neighborhood_group = res.data.results[0].address_components[2].long_name;
        const neighborhood_group = (res.data.results[0].address_components[3].long_name);
        let room_type = tableData.type
        room_type === "Apartment" ? room_type = "Entire home/apt" : room_type;

        const lat_lng = {
          lat: lat,
          lng: lng,
          neighborhood_group: neighborhood_group,
          room_type: room_type
        }
        console.log(lat_lng);

      }).catch((err) => {
        console.log(err)
      });

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
  console.log(user_permission);
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
  console.log(req.decodedToken);
  const user_id = req.decodedToken.id;
  const user_permission = req.decodedToken.user_permission;

  // to delete, the user is requered to either be an admin or to have a matching id to the item they are trying to delete
  // const matches  = user_id === id && user_permission !== 3;
  try {
    const itemExists  = await findBy(table.toString(), "id", id);
    console.log(itemExists);
    const { renter_id } = itemExists;

    if (itemExists) {
      // const exists = await findById(table.toString(), id);
      if (user_id === renter_id || user_permission === 3) { // OR user_permission === 3
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
    // err being thrown when I delete item at index 1
    res.status(500).json({
      err: err.message,
      msg: "There was a server error fulfilling your request"
    });
  };
});


module.exports = router;