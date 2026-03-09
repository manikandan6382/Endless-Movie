import type { Genre } from '../types/genreFilter';

export const MOVIE_GENRES: Genre[] = [
    { id: 28, name: 'Action', endpoint: '/discover/movie?with_genres=28' },
    { id: 16, name: 'Animation', endpoint: '/discover/movie?with_genres=16' },
    { id: 12, name: 'Adventure', endpoint: '/discover/movie?with_genres=12' },
    { id: 35, name: 'Comedy', endpoint: '/discover/movie?with_genres=35' },
    { id: 80, name: 'Crime', endpoint: '/discover/movie?with_genres=80' },
    { id: 18, name: 'Drama', endpoint: '/discover/movie?with_genres=18' },
    { id: 27, name: 'Horror', endpoint: '/discover/movie?with_genres=27' },
    { id: 10749, name: 'Romance', endpoint: '/discover/movie?with_genres=10749' },
    { id: 878, name: 'Sci-Fi', endpoint: '/discover/movie?with_genres=878' },
    { id: 53, name: 'Thriller', endpoint: '/discover/movie?with_genres=53' },
];

export const TV_GENRES: Genre[] = [
    { id: 10759, name: 'Action & Adventure', endpoint: '/discover/tv?with_genres=10759' },
    { id: 16, name: 'Animation', endpoint: '/discover/tv?with_genres=16' },
    { id: 35, name: 'Comedy', endpoint: '/discover/tv?with_genres=35' },
    { id: 80, name: 'Crime', endpoint: '/discover/tv?with_genres=80' },
    { id: 18, name: 'Drama', endpoint: '/discover/tv?with_genres=18' },
    { id: 10765, name: 'Sci-Fi & Fantasy', endpoint: '/discover/tv?with_genres=10765' },
    { id: 9648, name: 'Mystery', endpoint: '/discover/tv?with_genres=9648' },
];

export const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'top_rated', label: 'Top Rated' },
];

export const ORDER_OPTIONS = [
    { value: 'asc', label: 'A → Z' },
    { value: 'desc', label: 'Z → A' },
];

export const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [{ value: 'all', label: 'All years' }];
    for (let year = currentYear; year >= 1980; year--) {
        years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
};
