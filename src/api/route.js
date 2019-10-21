const { Router } = require('express');
const { Movies } = require('./models');
const controller = require('./controller');
const config = require('../config');

const homeController = controller({ Movies, config });

const router = Router();

router.get('/', homeController.fetchHome);
router.get('/movies', homeController.fetchAllMovies);
router.post('/favorites/:title', homeController.saveFavorites);
router.get('/search/:query', homeController.searchMovies);

module.exports = router;
