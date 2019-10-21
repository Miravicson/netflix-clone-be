const Passport = require('passport');
const PassportJWT = require('passport-jwt');
const config = require('../config');
const User = require('../api/users/models/user.model');

const passport = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };
  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne(
        {
          _id: payload.id,
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        }
      );
    })
  );
};

module.exports = passport;
