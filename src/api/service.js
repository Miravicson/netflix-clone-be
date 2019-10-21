const axios = require('axios');
const { purifyMovie } = require('./validators');

const services = dependcyObject => {
  const { Movies, config } = dependcyObject;
  const favoriteMovies = async movie => {
    let success = false;
    const newMovie = new Movies(movie);
    try {
      await newMovie.save();
      success = true;
    } catch (error) {
      throw new Error(error);
    }
    return {
      success,
      ...newMovie.toJSON(),
    };
  };

  const fetchAllMovies = async (short = false) => {
    let movies;
    try {
      if (short) {
        try {
          movies = await Movies.find({}).select({
            title: 1,
            _id: 0,
            year: 1,
            language: 1,
            country: 1,
            poster: 1,
          });
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          movies = await Movies.find({}).select('-_id -__v');
        } catch (error) {
          throw new Error(error);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
    return movies;
  };

  const saveMovie = async movie => {
    console.log('Saving movie with title: ', movie.title);
    const newMovie = new Movies(movie);
    try {
      await newMovie.save();
    } catch (error) {
      throw new Error(error);
    }
  };
  /**
   *
   * @param {*} qs - title of movie to search
   */
  const searchMovies = async qs => {
    const { omdbKey, omdbBaseUrl } = config;
    const searchUrl = `${omdbBaseUrl}/?t=${qs}&apikey=${omdbKey}`;
    console.log(searchUrl);
    let movie;
    try {
      const response = await axios.get(searchUrl);
      movie = response.data;
    } catch (error) {
      throw new Error(error.toString());
    }
    return movie;
  };

  return {
    favoriteMovies,
    fetchAllMovies,
    searchMovies,
    saveMovie,
  };
};

module.exports = services;
