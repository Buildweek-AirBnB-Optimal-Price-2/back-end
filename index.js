require("dotenv").config()
const server = require("./api/server");

const PORT = process.env.PORT
// console.log(PORT)

server.listen(PORT, () => {
  console.log(`---> Server listening on port ${PORT} <---`);
})