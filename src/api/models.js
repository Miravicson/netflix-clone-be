const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const movieSchema = new Schema({
  title: String,
  year: String,
  rated: String,
  runtime: String,
  genre: String,
  director: String,
  writers: String,
  actors: String,
  plot: String,
  language: String,
  country: String,
  awards: String,
  poster: String,
  ratings: [
    {
      source: String,
      value: String,
    },
  ],
  metaScore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  type: String,
  DVD: String,
  boxOffice: String,
  production: String,
  website: String,
});

const Movies = mongoose.model('Movies', movieSchema);
module.exports = { Movies };
