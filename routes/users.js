const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users");

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  const { error } = validate({ name, email, password });

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User is already registered");

  let salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await new User({ name, email, password }).save();
  res.send({ name, email });
});



module.exports = router;
