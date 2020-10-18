// require("dotenv").config(); <-- I don't think I need that here since it is already in index
const knex = require("knex");

const knexConfig = require("../knexfile");

const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[dbEnv]);