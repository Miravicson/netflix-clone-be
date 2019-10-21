const { Router } = require('express');
const { Movies } = require('./models');
const User = require('./users/models/user.model.js');
const controller = require('./controller');
const userController = require('./users/user.controller');
const config = require('../config');
const { authPolicy } = require('../utils/auth.policies');

const homeController = controller({ Movies, config });
const userControllerObject = userController({ User });

const router = Router();

router.get('/', homeController.fetchHome);
router.post('/signup', userControllerObject.signup);
router.post('/login', userControllerObject.login);
router.get('/movies', authPolicy, homeController.fetchAllMovies);
// router.post('/favorites/:title', homeController.saveFavorites);
router.get('/search/:query', authPolicy, homeController.searchMovies);

module.exports = router;
