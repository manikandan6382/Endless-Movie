import { useEffect, useState, useMemo } from 'react';
import axios from '../helpers/axios';
import { MOVIE_GENRES, TV_GENRES } from '../constants/genreData';
import type { Movie } from '../types/movie';
import type { SortType, OrderType, ContentType } from '../types/genreFilter';

export const useGenreFilter = (contentType: ContentType) => {
    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    const [selectedGenres, setSelectGenres] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortType>('latest');
    const [genreData, setGenreData] = useState<Record<number, Movie[]>>({});
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const newData: Record<number, Movie[]> = {};
            for (const genreId of selectedGenres) {
                const genre = genres.find(g => g.id === genreId);
                if (!genre) continue;

                try {
                    const url = buildApiUrl(genre.endpoint);
                    const response = await axios.get(url);
                    newData[genreId] = response.data.results.slice(0, 20);
                } catch (error) {
                    console.error(`Failed to fetch ${genre.name}:`, error);
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
    };
};
