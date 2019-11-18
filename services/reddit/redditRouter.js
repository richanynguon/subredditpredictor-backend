const redditRouter = require('express').Router();
// Helpers
const {
  requireLogin,
  handleErrors,
  authorizeRedditAccess
} = require('../global/globalHelpers');
// Endpoints
redditRouter.get('/', requireLogin, (req, res, next) => {
  res.status(200).json({ url: authorizeRedditAccess() });
});

redditRouter.get('/auth', requireLogin, (req, res, next) => {
  const { state, code, error } = req.query;
  const isValidState = bcrypt.compareSync(config.redditState, state);
  if(isValidState && code && !error) {
    res.status(200).json({ authorized: true });
  } else {
    next({ message: error, status: 403 });
  }
});

handleErrors('redditRouter', redditRouter);

module.exports = redditRouter;
