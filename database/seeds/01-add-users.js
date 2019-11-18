require('dotenv').config();
const bcrypt = require('bcryptjs');
exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'admin', password: bcrypt.hashSync(process.env.ADMIN_PW, 11) },
      ]);
    });
};
