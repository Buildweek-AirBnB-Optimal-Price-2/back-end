const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// import routes

// instantiate express
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// connect routers

module.exports = server;