const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

router.post("/", async (req, res) => {
  let { email, password } = req.body;
  const { error } = validate({ email, password });

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Wrong email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Wrong email or password");

  const token = jwt.sign({ id: user._id }, "123456");
  res.send(token);
});

const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

function validate(inputs) {
  return schema.validate(inputs);
}

module.exports = router;
