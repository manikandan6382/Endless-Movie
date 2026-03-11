import { useEffect, useState, useMemo } from 'react';
import axios from '../helpers/axios';
import { MOVIE_GENRES, TV_GENRES } from '../constants/genreData';
import type { Movie } from '../types/movie';
import type { SortType, OrderType, ContentType } from '../types/genreFilter';
import { getItem, setItem } from '../helpers/storage';

export const useGenreFilter = (contentType: ContentType) => {
    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    const [selectedGenres, setSelectGenres] = useState<number[]>(() => {
        return getItem(`selectedGenres_${contentType}`, []);
    });
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortType>('latest');
    const [genreData, setGenreData] = useState<Record<number, Movie[]>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const genres = useMemo(() => {
        return contentType === 'all' || contentType === 'movie'
            ? MOVIE_GENRES
            : TV_GENRES;
    }, [contentType]);

    const toggleGenreId = (genreId: number) => {
        setSelectGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        );
    };


    useEffect(() => {
        if (selectedGenres.length === 0) return;
        setItem(`selectedGenres_${contentType}`, selectedGenres);
        const buildApiUrl = (endpoint: string) => {
            const currentYear = new Date().getFullYear();
            let url = endpoint;

            if (selectedYear !== 'all') {
                if (contentType === 'movie' || contentType === 'all') {
                    url += `&primary_release_year=${selectedYear}`;
                } else {
                    url += `&first_air_date_year=${selectedYear}`;
                }
            } else if (sortBy === 'latest') {
                url += `&release_date.lte=${currentYear}-12-31`;
            }

            if (sortBy === 'latest') {
                url += `&sort_by=release_date.desc`;
            } else {
                url += `&sort_by=vote_average.desc&vote_count.gte=100`;
            }

            return url;
        };

        const fetchGenreData = async () => {
            setError(null);
            setLoading(true);

            const newData: Record<number, Movie[]> = {};
            for (const genreId of selectedGenres) {
                const genre = genres.find(g => g.id === genreId);
                if (!genre) continue;

                try {
                    const url = buildApiUrl(genre.endpoint);
                    const response = await axios.get(url);
                    const moviesWithPoster = response.data.results.filter(
                        (movie: Movie) => movie.poster_path 
                    );
                    newData[genreId] = moviesWithPoster.slice(0, 20);
                } catch (error) {
                    console.error(`Failed to fetch ${genre.name}:`, error);
                    setError('Failed to search movies. Please try again.');

                }
            }
            setGenreData(newData);
            setLoading(false);
        };

        fetchGenreData();
    }, [selectedGenres, sortBy, selectedYear, contentType, genres]);

    const sortMovies = (movies: Movie[]) => {
        return [...movies].sort((a, b) => {
            const titleA = (a.title || a.name || '').toLowerCase();
            const titleB = (b.title || b.name || '').toLowerCase();
            return orderBy === 'asc'
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
        });
    };

    return {
        genres,
        selectedGenres,
        toggleGenreId,
        orderBy,
        setOrderBy,
        sortBy,
        setSortBy,
        selectedYear,
        setSelectedYear,
        genreData,
        loading,
        sortMovies,
        error,
    };
};
