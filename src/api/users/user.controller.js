const { validateLogin, validateSignup, validateRegisterToken } = require('./users.validators');

const jwt = require('../../utils/jwt');

const { encryptPassword, comparePassword } = require('./user.service');

const controller = dependencyObject => {
  const { User } = dependencyObject;
  const signup = async (req, res) => {
    if (!req.is('application/json')) {
      return res.status(400).json({
        message: 'Expects application/json',
      });
    }
    const { token } = req.headers;

    if (!token) {
      return res.status(403).json({
        message: 'You must supply a registration token header',
      });
    }

    if (!validateRegisterToken(token)) {
      return res.status(403).json({
        message: 'Invalid registration token supplied ',
      });
    }

    const { value, error } = validateSignup(req.body);
    if (error) {
      return res.status(409).json({
        error: error.details,
        message: 'Invalid Argument',
      });
    }
    if (value) {
      const data = {
        ...value,
        password: encryptPassword(value.password),
      };

      try {
        // Verify that the user does not exists
        let user = await User.findOne({
          email: value.email,
        });
        if (user) {
          return res.status(401).send(`Another user with the email ${value.email}  exists`);
        }
        user = await new User(data);
        await user.save();
        res.status(201).send({
          success: true,
        });
      } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`);
      }
    }
  };

  // Login Users based on email and password. Responds with a Json Web Token

  const login = async (req, res) => {
    if (!req.is('application/json')) {
      return res.status(400).json({
        error: 'Expects application/json',
      });
    }
    const { value, error } = validateLogin(req.body);
    if (error) {
      return res.status(409).json({
        error: error.details,
        message: 'Invalid Argument',
      });
    }

    if (value) {
      try {
        // Verify that the user exists
        const user = await User.findOne({
          email: value.email,
        });
        if (!user) {
          return res.status(401).send('Unathorized: check login details');
        }

        // Verify that the password is correct
        const authenticated = comparePassword(value.password, user.password);
        if (!authenticated) {
          return res.status(401).json({
            error: 'Unathorized: check login details',
          });
        }
        const token = jwt.issue(
          {
            id: user._id,
          },
          '1d' // expiry  1 day
        );
        delete user._doc.password;
        delete user._doc.__v;
        // Send jwt token
        res.status(200).json({
          token: token.token,
          user: user.email,
        });
      } catch (error) {
        res.status(500).json({
          error,
        });
      }
    }
  };

  return {
    login,
    signup,
  };
};

module.exports = controller;
