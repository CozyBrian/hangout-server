function logger(req, res, next) {
  var date = new Date();
  console.log(`${req.method} ${req.url} ${date.toISOString()}`);
  next();
}

module.exports = logger;