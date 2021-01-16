const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(400).send("no token was provided");
  let user;
  try {
    user = jwt.verify(token, config.get("JWT_Private_Key"));
  } catch (error) {
    return res.status(401).send("invalid token");
  }
  //   req.user = user;
  next();
};

module.exports = auth;
