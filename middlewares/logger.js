const logger = (req, res, next) => {
  console.log(`request on ${req.url} with method ${req.method}`);
  next();
};

module.exports = logger;
