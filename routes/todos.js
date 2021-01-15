const express = require("express");
const router = express.Router();
const { ToDo, validate } = require("../models/todos");
const authenticate = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const todos = await ToDo.find();
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ToDo.findById(id);
  if (!todo) return res.status(404).send("no todo with the given id");
  res.send(todo);
});

router.post("/", async (req, res) => {
  const { title, body } = req.body;
  const { error } = validate({ title, body });

  if (error) return res.status(400).send(error.details[0].message);

  const todo = await new ToDo({ title, body }).save();
  res.send(todo);
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const { error } = validate({ title, body });
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await ToDo.findById(id);
  if (!todo) return res.status(404).send("no todo with the given id");

  todo.set({ title, body });
  res.send(await todo.save());
});

router.delete("/:_id", authenticate, async (req, res) => {
  const { _id } = req.params;
  const todo = await ToDo.findById(_id);
  await ToDo.deleteOne({ _id });
  res.send(todo);
});

module.exports = router;
