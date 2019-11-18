const config = require('../../config');
const bcrypt = require('bcryptjs');
const redditRouter = require('express').Router();
// Helpers
const {
  requireLogin,
  handleErrors,
  authorizeRedditAccess
} = require('../global/globalHelpers');
// Endpoints
redditRouter.get('/', requireLogin, (req, res, next) => {
  const { mobile } = req.query;
  res.status(200).json({ url: authorizeRedditAccess(mobile ? true : false) });
});

redditRouter.get('/auth', requireLogin, (req, res, next) => {
  const { state, code, error } = req.query;
  const isValidState = bcrypt.compareSync(config.redditState, decodeURIComponent(state));
  if(isValidState && code && !error) {
    res.status(200).json({ authorized: true });
    // get the access token next
  } else {
    next({ message: error, status: 403 });
  }
});

handleErrors('redditRouter', redditRouter);

module.exports = redditRouter;
