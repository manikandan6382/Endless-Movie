
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import type { Movie } from '../../Pages/MovieDetails/MovieDetails';
import axios from '../../helpers/axios';
import Cards from '../Common/Cards';

interface GenreFilterProps {
    contentType: 'all' | 'movie' | 'tv'
}
interface DropdownProps {
    value: string,
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    label?: string;
}

interface Genre {
    id: number,
    name: string,
    endpoint: string,
}

type SortType = 'latest' | 'top_rated';

type OrderType = 'asc' | 'desc';

const Dropdown = ({ value, options, onChange, label }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, [])
    const selectedOptions = options.find(o => o.value === value);
    return (
        <div className="relative min-w-35" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center justify-between gap-2 hover:bg-gray-700 transition-all duration-200 hover:shadow-lg`}
            >
                <span>{selectedOptions?.label || label}</span>
                <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-2xl z-20 overflow-hidden animate-slideDown">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map(option => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setIsOpen(!isOpen)
                                }}
                                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700 transition-all duration-150 relative overflow-hidden group ${value === option.value ? 'bg-gray-700' : ''}`}
                            >
                                <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-300"></span>

                                <span className="text-white relative z-10">{option.label}</span>
                                {value === option.value && (
                                    <Check className="size-4 text-netflix-red relative z-10 animate-scaleIn" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
const GenreFilter = ({ contentType }: GenreFilterProps) => {

    const [orderBy, setOrderBy] = useState<OrderType>('asc');
    const [selectedGenres, setSelectGenres] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortType>('latest');
    const [genreData, setGenreData] = useState<Record<number, Movie[]>>({});
    const [loading, setLoading] = useState(false)

    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [{ value: 'all', label: 'All years' }]
        for (let year = currentYear; year >= 1980; year--) {
            years.push({ value: year.toString(), label: year.toString() })
        }
        return years
    }
    const yearOptions = getYearOptions();

    const sortOptions = [
        { value: 'latest', label: 'Latest' },
        { value: 'top_rated', label: 'Top Rated' },
    ];

    const orderOptions = [
        { value: 'asc', label: 'A → Z' },
        { value: 'desc', label: 'Z → A' },
    ]

    const getGenres = (): Genre[] => {
        if (contentType === 'all' || contentType === 'movie') {
            return [
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
            ]
        } else {
            return [
                { id: 10759, name: 'Action & Adventure', endpoint: '/discover/tv?with_genres=10759' },
                { id: 16, name: 'Animation', endpoint: '/discover/tv?with_genres=16' },
                { id: 35, name: 'Comedy', endpoint: '/discover/tv?with_genres=35' },
                { id: 80, name: 'Crime', endpoint: '/discover/tv?with_genres=80' },
                { id: 18, name: 'Drama', endpoint: '/discover/tv?with_genres=18' },
                { id: 10765, name: 'Sci-Fi & Fantasy', endpoint: '/discover/tv?with_genres=10765' },
                { id: 9648, name: 'Mystery', endpoint: '/discover/tv?with_genres=9648' },
            ];
        }
    }

    const genres = getGenres();
    const toggleGenreId = (genreId: number) => {
        setSelectGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        )
    }

    useEffect(() => {
        if (selectedGenres.length === 0) return;
        const buildApiUrl = (endpoint: string) => {
            const currentYear = new Date().getFullYear();
            let url = endpoint;
            if (selectedYear !== 'all') {
                if (contentType === 'movie' || contentType === 'all') {
                    url += `&primary_release_year=${selectedYear}`
                } else {
                    url += `&first_air_date_year=${selectedYear}`;
                }
            } else {
                if (sortBy === 'latest') {
                    url += `&release_date.lte=${currentYear}-12-31`;
                }
            }
            if (sortBy === 'latest') {
                url += `&sort_by=release_date.desc`;
            } else {
                url += `&sort_by=vote_average.desc&vote_count.gte=100`;
            }
            return url;
        }
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
            setGenreData(newData)
            setLoading(false)
        }
        fetchGenreData()
    }, [selectedGenres, sortBy, selectedYear, contentType, genres])

    const sortMovies = (movies: Movie[]) => {

        const sorted = [...movies].sort((a, b) => {
            const titleA = (a.title || a.name || '').toLowerCase();
            const titleB = (b.title || b.name || '').toLowerCase();

            return orderBy === 'asc'
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA)
        })
        return sorted;
    }

    return (
        <div className=''>
            <div className="">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-3">
                        {
                            genres.map(genre => (
                                <button
                                    key={genre.id}
                                    onClick={() => toggleGenreId(genre.id)}
                                    className={`min-w-40 text-sm px-4 py-2 rounded-full font-semibold transition-all duration-200
                                     ${selectedGenres.includes(genre.id)
                                            ? 'bg-netflix-red text-white shadow-lg scale-105'
                                            : 'bg-black text-gray-400 cursor-pointer hover:scale-105'
                                        }
                                    `}
                                >
                                    {genre.name}
                                </button>
                            ))
                        }
                    </div>

                    {selectedGenres.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                            <Dropdown
                                value={orderBy}
                                options={orderOptions}
                                onChange={(val) => setOrderBy(val as OrderType)}
                                label="Sort By"
                            />
                            <Dropdown
                                value={sortBy}
                                options={sortOptions}
                                onChange={(val) => setSortBy(val as SortType)}
                                label="Order"
                            />
                            <Dropdown
                                value={selectedYear}
                                options={yearOptions}
                                onChange={setSelectedYear}
                                label="Year"
                            />
                        </div>
                    )}
                    {loading && <div className="text-white text-center">Loading...</div>}

                    {selectedGenres.map(genreId => {
                        const genre = genres.find(g => g.id === genreId);
                        const movies = genreData[genreId] || [];
                        const sortedMovies = sortMovies(movies)
                        if (!genre || movies.length === 0) return null;

                        return (
                            <Cards
                                key={genreId}
                                title={genre.name}
                                movies={sortedMovies}
                                type={contentType}
                                breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GenreFilter