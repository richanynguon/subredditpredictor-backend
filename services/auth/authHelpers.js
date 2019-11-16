const jwt = require("jsonwebtoken");
const db = require("../../database/db-config");
const users = 'users';

// Helpers
const generateJWT = user => {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: "8h"
	};
	return jwt.sign(payload, process.env.TOKENSECRET, options);
};

// Middleware
const validateLoginBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Missing required fields!' });
  } else {
    req.body = { username, password };
    next();
  }
}

// User Model
const findAll = (filter) => {
  if (!filter) {
    return db(users).select('id', 'username');
  } else {
    return db(users).where(filter).select('id', 'username');
  }
}

const findOne = (filter) => {
  return db(users).where(filter).first();
}

const add = (newUser) => {
  return db(users).insert(newUser).then((ids) => findOne({ id: ids[0] }));
}

const update = (changes, id) => {
  return db(users).where({ id }).update(changes).then(() => findOne({ id }));
}

const remove = (id) => {
  return db(users).where({ id }).del();
}

module.exports = {
  generateJWT,
  validateLoginBody,
  // Model
  findAll,
  findOne,
  add,
  update,
  remove
};
