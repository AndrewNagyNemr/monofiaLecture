const jwt = require("jsonwebtoken");
const config = require("config");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if(!token) res.status(401).send("No token was provided")
  
  try {
    jwt.verify(token, "123456")
    
  } catch (error) {
    
  }
  if (username !== "admin" && password !== "admin")
    return res.status(401).send("username or password are wrong");

  next();
};

module.exports = authenticate;
