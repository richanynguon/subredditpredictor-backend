const jwt = require("jsonwebtoken");

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

module.exports = { generateJWT };
