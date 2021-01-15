const express = require("express");
const mongoose = require("mongoose");
const { ToDo } = require("./model/todos");

mongoose
  .connect("mongodb://localhost/monofiaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo database");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(express.json());

const port = process.env.PORT || port;

app.get("/api/todos", async (req, res) => {
  const todos = await ToDo.find();
  res.send(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ToDo.findById(id);
  res.send(todo);
});

app.post("/api/todos", async (req, res) => {
  const { title, body } = req.body;
  const todo = await new ToDo({ title, body }).save();
  res.send(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const todo = await ToDo.findById(id);
  todo.set({ title, body });
  res.send(await todo.save());
});

app.delete("/api/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  const todo = await ToDo.findById(_id);
  await ToDo.deleteOne({ _id });
  res.send(todo);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
