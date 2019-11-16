function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

const requireLogin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.TOKENSECRET, (err, decodedUser) => {
      if (err) {
        next({ message: err });
      } else {
        req.loggedInUser = decodedUser;
        next();
      }
    });
  } else {
    next({ status: 403, message: "You need to login in order to gain access!" });
  }
}

const handleErrors = (file, router) => {
  router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      file: file,
      url: req.url,
      method: req.method,
      status: error.status || 500,
      message: error.message,
      protocol: req.protocol
    }).end();
  });
}

module.exports = {
  logger,
  requireLogin,
  handleErrors
};
