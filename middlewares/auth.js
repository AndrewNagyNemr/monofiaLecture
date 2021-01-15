const authenticate = (req, res, next) => {
  const { username, password } = req.headers;
  //dummy
  if (username !== "admin" && password !== "admin")
    return res.status(401).send("username or password are wrong");

  next();
};

module.exports = authenticate;
