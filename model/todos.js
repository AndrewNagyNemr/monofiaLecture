const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  body: String,
});

const ToDo = mongoose.model("ToDo", schema);

module.exports = { ToDo };