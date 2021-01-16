const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const compression = require("compression");

const todoRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const dbConnection = config.get("database.dbconnection");
mongoose
  .connect(dbConnection, {
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
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.static("static"));
app.use("/api/todos", todoRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port:${port}`));
