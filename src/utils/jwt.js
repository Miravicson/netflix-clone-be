const jwt = require('jsonwebtoken');
const config = require('../config');

const customJwt = {
  issue(payload, expiresIn) {
    const token = jwt.sign(payload, config.secret, {
      expiresIn,
    });
    const { iat, exp } = jwt.decode(token);
    return {
      token,
      iat,
      exp,
    };
  },
};

module.exports = customJwt;
