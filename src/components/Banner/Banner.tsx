import { useEffect, useState } from 'react'
import axios from '../../helpers/axios'
import requests from '../../helpers/requests'
import { getImageUrl } from '../../helpers/imageHelper'
import { Star, Plus, Play, Clock4, CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
interface Movie {
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
    title: string;
    original_name: string;
    vote_average: number;
    genre_ids: number[];
    id: number;
    release_date?: string;
    first_air_date?: string;
}
interface MovieDetails {
    episode_run_time: number[];
}
const Banner = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [genres, setGenres] = useState<Record<number, string>>({});
    const [duration, setDuration] = useState<string>('')
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {

            const [movieGenresRes, tvGenresRes] = await Promise.all([
                axios.get(requests.fetchMovieGenres),
                axios.get(requests.fetchTVGenres),
            ])

            const genresMap = [
                ...movieGenresRes.data.genres,
                ...tvGenresRes.data.genres
            ].reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
                acc[genre.id] = genre.name;
                return acc
            }, {})

            setGenres(genresMap)

            const trendingResponse = await axios.get(requests.fetchTrending)
            const randomMovie = trendingResponse.data.results[
                Math.floor(Math.random() * trendingResponse.data.results.length)
            ]

            setMovie(randomMovie)

            const type = randomMovie.media_type || (randomMovie.title ? 'movie' : 'tv');
            setMediaType(type)
            if (randomMovie?.id) {
                try {
                    const detailsResponse = await axios.get<MovieDetails>(
                        `/tv/${randomMovie.id}`
                    );

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

        }
        fetchData()
    }, [])
    function truncate(str: string, n: number) {
        return str.length > n ? str.slice(0, n - 1) + '...' : str
    }
    const getGenreNames = () => {
        if (!movie) return '';

        return movie.genre_ids
            .map(id => genres[id])
            .filter(Boolean)
            .join(' | ')
    }
    const handleWatch = () => {
        if (movie?.id) {
            navigate(`/${mediaType}/${movie.id}`)
        }
    }
    const releaseDate = movie?.release_date || movie?.first_air_date;
    const formattedDate = releaseDate
        ? new Date(releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';
    return (
        <section className="">
            {movie?.backdrop_path && (
                <div className="">
                    <div className="">
                        <img src={getImageUrl(movie.backdrop_path)} alt="title" className='bg-layer' />
                    </div>
                    <div className="bg-cover bg-center min-h-[85dvh] bg-backdrop-before flex justify-center flex-col"
                        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
                    >
                        <div className="flex flex-col gap-10 text-white font-bold max-w-2xl px-5 md:pl-20 mt-10">
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-5 lg:gap-10">
                                    {duration && <p className='flex items-center gap-2'><Clock4 className='size-5' /> {duration}</p>}
                                    <div className="flex items-center gap-2"><CalendarDays className='size-5' /> {formattedDate}</div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className="text-2xl flex gap-2 items-center"><Star className='fill-yellow-400 stroke-yellow-400' />{movie?.vote_average?.toFixed(1)}</p>
                                    {getGenreNames() && (
                                        <p className='opacity-90'><span>{getGenreNames()}</span> </p>
                                    )}
                                </div>
                                <h1 className='text-6xl tracking-widest leading-18'>{movie?.title || movie?.name || movie?.original_name}</h1>
                            </div>
                            <p className='leading-8'>{truncate(movie?.overview, 150)}</p>
                            <div className="flex gap-5">
                                <motion.button
                                    onClick={handleWatch}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(229,9,20,0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className='font-bold btn-netflix-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'
                                >
                                    <Play className='size-5 fill-white' />watch
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className='font-bold btn-black-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'
                                >
                                    <Plus />add list
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
export default Banner