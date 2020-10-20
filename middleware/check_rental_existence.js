// Giving this a specific name so I can go ahead and get it done for exactly what I'm expecting

const { findBy } = require("../models");

module.exports = async (req, res, next) => { // of course, I could check the route name and then treat them accordingly
  // street address is the only unqiue constraint we have
  // const {url} = req;
  const { table } = req.params;
  const { street_address } = req.body;
  // how could I pull the necessary key ("street_address")
  const [exists] = await findBy(table.toString(), "street_address", street_address.toString());

  if (!exists) {
    next();
  } else {
    res.status(400).json({
      msg: "Property with street address already exists"
    });
  };
};