
const requests = {

  // Netflix Originals
  fetchNetflixOriginals: `/discover/tv?&with_networks=213`,

  // Top Rated
  fetchTopRated: `/movie/top_rated?&language=en-US`,
  // Genre Lists
  fetchTVGenres: `/genre/tv/list?&language=en-US`,
  fetchMovieGenres: `/genre/movie/list?&language=en-US`,

  // Section 1: Content Type Filters
  fetchTrending: `/trending/all/week?language=en-US`,
  fetchTrendingMovies: `/trending/movie/week?language=en-US`,
  fetchTrendingTV: `/trending/tv/week?language=en-US`,

  fetchPopular: `/trending/all/day?language=en-US`,  // Popular = Daily trending
  fetchPopularMovies: `/movie/popular?language=en-US`,
  fetchPopularTV: `/tv/popular?language=en-US`,

  fetchUpcoming: `/movie/upcoming?language=en-US`,  // Premieres (upcoming)
  fetchUpcomingTV: `/tv/on_the_air?language=en-US`,  // Currently airing

  fetchRecentMovies: `/discover/movie?primary_release_date.gte=${getCurrentMonthStart()}&primary_release_date.lte=${getCurrentMonthEnd()}`,
  fetchRecentTV: `/discover/tv?first_air_date.gte=${getCurrentMonthStart()}&first_air_date.lte=${getCurrentMonthEnd()}`,

  // Movie Genres
  fetchActionMovies: `/discover/movie?with_genres=28`,
  fetchAdventureMovies: `/discover/movie?with_genres=12`,
  fetchAnimationMovies: `/discover/movie?with_genres=16`,
  fetchComedyMovies: `/discover/movie?with_genres=35`,
  fetchCrimeMovies: `/discover/movie?with_genres=80`,
  fetchDramaMovies: `/discover/movie?with_genres=18`,
  fetchHorrorMovies: `/discover/movie?with_genres=27`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749`,
  fetchSciFiMovies: `/discover/movie?with_genres=878`,
  fetchThrillerMovies: `/discover/movie?with_genres=53`,

  // TV Genres
  fetchActionTV: `/discover/tv?with_genres=10759`,
  fetchAdventureTV: `/discover/tv?with_genres=10759`,
  fetchAnimationTV: `/discover/tv?with_genres=16`,
  fetchComedyTV: `/discover/tv?with_genres=35`,
  fetchCrimeTV: `/discover/tv?with_genres=80`,
  fetchDramaTV: `/discover/tv?with_genres=18`,
  fetchSciFiTV: `/discover/tv?with_genres=10765`,
  fetchMysteryTV: `/discover/tv?with_genres=9648`,
};

// Helper function for current month
export function getCurrentMonthStart() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
}

export function getCurrentMonthEnd() {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${lastDay}`;
}


export default requests;