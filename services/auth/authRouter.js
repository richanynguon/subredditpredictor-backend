const bcrypt = require('bcryptjs');
const authRouter = require('express').Router();
// Helpers
const globalHelpers = require('../global/globalHelpers');
const authHelpers = require('../auth/authHelpers');
// Endpoints
authRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  authHelpers.findOne({ username }).then(user => {
    if (!user || !user.password) {
      next({ status: 400, message: "This user does not exist!" });
    } else {
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        next({ status: 403, message: "Invalid credentials" });
      } else {
        const token = authHelpers.generateJWT(user);
        res.status(200).json({
          id: user.id,
          token
        });
      }
    }
  }).catch(next);
});

globalHelpers.handleErrors('authRouter', authRouter);

module.exports = authRouter;
