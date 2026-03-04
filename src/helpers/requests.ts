
const requests = {
  // Trending
  fetchTrending: `/trending/all/week?&language=en-US`,
  fetchTrendingMovies: `/trending/movie/week?&language=en-US`,
  
  // Netflix Originals
  fetchNetflixOriginals: `/discover/tv?&with_networks=213`,
  
  // Top Rated
  fetchTopRated: `/movie/top_rated?&language=en-US`,
  
  // Genres
  fetchActionMovies: `/discover/movie?&with_genres=28`,
  fetchComedyMovies: `/discover/movie?&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?&with_genres=99`,
  
  // Genre Lists
  fetchTVGenres: `/genre/tv/list?&language=en-US`,
  fetchMovieGenres: `/genre/movie/list?&language=en-US`,
};

export default requests;