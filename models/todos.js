const mongoose = require("mongoose");
const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  body: Joi.string().min(5).max(255).required(),
});

const validate = (inputs)=>{
  return schema.validate(inputs)
}

const ToDo = mongoose.model(
  "ToDo",
  new mongoose.Schema({
    title: String,
    body: String,
  })
);

module.exports = { ToDo, validate };
