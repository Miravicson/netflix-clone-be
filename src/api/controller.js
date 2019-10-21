const { purifyMovie } = require('./validators');
const serviceCreator = require('./service');

const controller = dependencyObject => {
  const services = serviceCreator(dependencyObject);
  const fetchHome = async (req, res) => {
    res.json({
      method: req.method,
      success: true,
      data: 'Welcome to the Netflix clone application',
    });
  };

  const saveFavorites = async (req, res) => {
    if (!req.is('json')) {
      return res.status(400).json({
        message: "Your request must be of a content-type of 'application/json'",
      });
    }
    const { body } = req;

    if (body === undefined) {
      return res.status(400).json({
        message: 'You must provide a request body',
      });
    }

    const { movie } = body;

    if (movie === undefined || typeof movie !== 'object' || Object.keys(movie) < 1) {
      return res.status(400).json({
        message: 'You must provide a movie',
      });
    }

    let data;
    try {
      const movie = purifyMovie(req.body.movie);
      data = await services.favoriteMovies(movie);
    } catch (error) {
      res.status(500).json({ error });
    }
    res.json({ data });
  };

  const fetchAllMovies = async (req, res) => {
    let movies;
    const { short } = req.query;
    try {
      movies = short === true ? await services.fetchAllMovies(short) : await services.fetchAllMovies();
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
    res.json({ data: movies });
  };

  const searchMovies = async (req, res) => {
    const { query } = req.params;
    if (!query) {
      return res.json([]);
    }
    let movie;
    try {
      movie = await services.searchMovies(query);
      res.json({
        data: purifyMovie(movie),
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
    try {
      await services.saveMovie(purifyMovie(movie));
    } catch (error) {
      console.log(error.toString());
    }
  };

  return {
    fetchHome,
    saveFavorites,
    fetchAllMovies,
    searchMovies,
  };
};

module.exports = controller;
