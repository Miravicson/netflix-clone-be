const purifyMovie = (movie = {}) => {
  const {
    Title: title,
    Year: year,
    Rated: rated,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Writer: writer,
    Actors: actors,
    Plot: plot,
    Language: language,
    Country: country,
    Awards: awards,
    Poster: poster,
    Ratings = [],
    Metascore: metaScore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type: type,
    DVD,
    BoxOffice: boxOffice,
    Production: production,
    Website: website,
  } = movie;

  const ratings = Ratings.map(({ Source: source, Value: value }) => ({ source, value }));

  return {
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    ratings,
    metaScore,
    imdbRating,
    imdbVotes,
    imdbID,
    type,
    DVD,
    boxOffice,
    production,
    website,
  };
};

module.exports = { purifyMovie };
