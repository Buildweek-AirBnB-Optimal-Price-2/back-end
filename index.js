// ------------> IDEAS <------------ \\
// I want users to be able to search a property by any of its values and add it to their user_properties table
// users can compare their selected properties to find the best bang for their buck --> perhaps entering parameters (weighting what is most important to them?)
// users can compare all properties in area they are searching for best price
// when user gives area to search (i.e. NYC, NY) they are shown google map of area and all listings, as well as a list of properties

// I want renters to be able to add pictures (just like ab&b) --> apparently good idea to store that in a file on the server that is pulled down by client
// 

require("dotenv").config()  // I think we only need this here
const server = require("./api/server");

const PORT = process.env.PORT || 5000; // so 5000 is our development port, but we will set the env var to the production port (or it will be automatically set by hosting service?)
// console.log(PORT)

server.listen(PORT, () => {
  console.log(`---> Server listening on port ${PORT} <---`);
})