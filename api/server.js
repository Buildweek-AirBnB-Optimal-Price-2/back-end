const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const login = require("../routers/login");
const register = require("../routers/register");
const authorized_routes = require("../routers/authorized_routes");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// routers
server.use("/register", register);
server.use("/login", login);
server.use("/api", authorized_routes);

// used for test
server.get("/", (req, res) => {
  res.status(200).json({
    api: "Functioning properly!",
  });
});

module.exports = server;