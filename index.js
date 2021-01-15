const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todos");
const logger = require("./middlewares/logger");
// const authenticate  = require("./middlewares/auth");
// const userRouter = require("./routes/users");

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

//middleware
// app.use(authenticate)
app.use(express.json());

console.log(process.env.ENV);
if (process.env.ENV !== "production") app.use(logger);

app.use("/api/todos", todoRouter);
// app.use("/api/users", userRouter);

const port = process.env.PORT || port;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
