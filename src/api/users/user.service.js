const bcrypt = require('bcryptjs');

const encryptPassword = plainText => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
};

const comparePassword = (plainText, encryptedPassword) => bcrypt.compareSync(plainText, encryptedPassword);

module.exports = { encryptPassword, comparePassword };
