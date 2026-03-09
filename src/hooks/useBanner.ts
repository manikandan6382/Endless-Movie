import { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import requests from '../helpers/requests';
import type { Movie } from '../types/movie';

interface MovieDetails {
    episode_run_time: number[];
}

export const useBanner = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [genres, setGenres] = useState<Record<number, string>>({});
    const [duration, setDuration] = useState<string>('');
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
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

            const trendingResponse = await axios.get(requests.fetchTrending);
            const randomMovie = trendingResponse.data.results[
                Math.floor(Math.random() * trendingResponse.data.results.length)
            ];

            setMovie(randomMovie);

            const type = randomMovie.media_type || (randomMovie.title ? 'movie' : 'tv');
            setMediaType(type);

            if (randomMovie?.id && type === 'tv') {
                try {
                    const detailsResponse = await axios.get<MovieDetails>(`/tv/${randomMovie.id}`);
                    const episodeRunTime = detailsResponse.data.episode_run_time;
                    if (episodeRunTime?.length > 0) {
                        const runtime = episodeRunTime[0];
                        const hours = Math.floor(runtime / 60);
                        const minutes = runtime % 60;
                        setDuration(`${hours}h ${minutes}m`);
                    }
                } catch (error) {
                    console.error('Failed to fetch details:', error);
                }
            }
            setLoading(false)
        };
        fetchData();
    }, []);

    const getGenreNames = () => {
        if (!movie) return '';
        return movie.genre_ids.map(id => genres[id]).filter(Boolean).join(' | ');
    };

    return { movie, duration, mediaType, getGenreNames , loading };
};
