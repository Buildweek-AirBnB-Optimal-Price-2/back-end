// refactor all of these to use objection

const add = require("./add");
const find = require("./find");
const findBy = require("./findBy");
const findById = require("./findById");
const update = require("./update");
const remove = require("./remove");
// add something to query by address through search

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};