const Joi = require('joi');
const config = require('../../config');

const validateSignup = body => {
  const schema = Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });
  const { value, error } = Joi.validate(body, schema);
  if (error && error.details) {
    return {
      error,
    };
  }
  return {
    value,
  };
};

const validateLogin = body => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required(),
  });
  const { value, error } = Joi.validate(body, schema);
  if (error && error.details) {
    return {
      error,
    };
  }
  return {
    value,
  };
};

const validateRegisterToken = token => token === config.registerToken;

module.exports = { validateLogin, validateRegisterToken, validateSignup };
