const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const helmet = require("helmet");
const compression = require("compression");

const todoRouter = require("./routes/todos");
// const usersRouter = require("./routes/users");
// const authRouter = require("./routes/auth");
// const authenticate  = require("./middlewares/auth");

const dbPass = config.get("database.dbPass");
mongoose
  .connect(
    `mongodb+srv://andrew:${dbPass}@cluster0.udlfz.mongodb.net/Cluster0?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongo database");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello form my first deployed app</h1>");
});

//middleware

// app.use(authenticate)
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use("/api/todos", todoRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/auth", auth);

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port:${port}`));
