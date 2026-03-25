import { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import requests from '../helpers/requests';
import type { Movie } from '../types/movie';

interface TVDetails {
    episode_run_time: number[];
}

interface MovieDetailsResponse {
    runtime: number;
}

export const useBanner = (contentType: 'all' | 'movie' | 'tv' = 'all') => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [genres, setGenres] = useState<Record<number, string>>({});
    const [duration, setDuration] = useState<string>('');
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                const [movieGenresRes, tvGenresRes] = await Promise.all([
                    axios.get(requests.fetchMovieGenres),
                    axios.get(requests.fetchTVGenres),
                ]);

                const genresMap = [
                    ...movieGenresRes.data.genres,
                    ...tvGenresRes.data.genres
                ].reduce((acc: Record<number, string>, genre: { id: number; name: string }) => {
                    acc[genre.id] = genre.name;
                    return acc;
                }, {});

                setGenres(genresMap);

                // Dynamic API endpoint based on contentType
                let apiEndpoint;
                if (contentType === 'movie') {
                    apiEndpoint = '/trending/movie/week';
                } else if (contentType === 'tv') {
                    apiEndpoint = '/trending/tv/week';
                } else {
                    apiEndpoint = '/trending/all/week';
                }

                const trendingResponse = await axios.get(apiEndpoint);
                const moviesWithBackdrop = trendingResponse.data.results.filter(
                    (movie: Movie) => movie.backdrop_path && movie.vote_average > 0
                );
                
                setMovies(moviesWithBackdrop.slice(0, 10));
            } catch (error) {
                console.error('Failed to fetch banner:', error);
                setError('Failed to load banner. Please refresh.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [contentType]);

    useEffect(() => {
        if (movies.length === 0) return;

        const currentMovie = movies[currentIndex];
        const type: 'movie' | 'tv' = currentMovie.media_type === 'tv' ? 'tv' : 'movie';
        setMediaType(type);

        const fetchDuration = async () => {
            if (!currentMovie?.id) return;

            try {
                if (type === 'tv') {
                    const detailsResponse = await axios.get<TVDetails>(`/tv/${currentMovie.id}`);
                    const episodeRunTime = detailsResponse.data.episode_run_time;
                    if (episodeRunTime?.length > 0) {
                        const runtime = episodeRunTime[0];
                        const hours = Math.floor(runtime / 60);
                        const minutes = runtime % 60;
                        setDuration(`${hours}h ${minutes}m`);
                    } else {
                        setDuration('');
                    }
                } else {
                    const detailsResponse = await axios.get<MovieDetailsResponse>(`/movie/${currentMovie.id}`);
                    const runtime = detailsResponse.data.runtime;
                    if (runtime) {
                        const hours = Math.floor(runtime / 60);
                        const minutes = runtime % 60;
                        setDuration(`${hours}h ${minutes}m`);
                    } else {
                        setDuration('');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch duration:', error);
                setDuration('');
            }
        };

        fetchDuration();
    }, [currentIndex, movies, contentType]);

    useEffect(() => {
        if (movies.length <= 1) return;

        // const interval = setInterval(() => {
        //     setCurrentIndex((prev) => (prev + 1) % movies.length);
        // }, 10000);

        // return () => clearInterval(interval);
    }, [movies.length]);

    const getGenreNames = () => {
        const movie = movies[currentIndex];
        if (!movie) return '';
        return movie.genre_ids?.map(id => genres[id]).filter(Boolean).join(' | ') || '';
    };

    return { 
        movie: movies[currentIndex] || null, 
        duration, 
        mediaType, 
        getGenreNames, 
        loading, 
        error,
        currentIndex,
        totalMovies: movies.length,
        setCurrentIndex
    };
};
