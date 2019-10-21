const passport = require('passport');

const authPolicy = [
  passport.authenticate('jwt', {
    session: false,
  }),
];

module.exports = { authPolicy };
