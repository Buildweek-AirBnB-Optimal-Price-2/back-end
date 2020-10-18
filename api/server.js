const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// import routes
const login_register = require("../routers/login_register");
const authorized_routes = require("../routers/authorized_routes");

// instantiate express
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// connect routers
server.use("/api/user", login_register);
server.use("/api", authorized_routes);

// used for test
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).json({
    api: "Functioning properly!",
  });
});

module.exports = server;

// HEY. BTW, you can add optional params to url w/ "?" --> /api/:user?/:properties? --> makes it so we can have one get route
// now, they build off of each other. So, for example, the only way to get properties is if user is given