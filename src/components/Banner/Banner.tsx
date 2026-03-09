import { getImageUrl } from '../../helpers/imageHelper';
import { Star, Plus, Play, Clock4, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBanner } from '../../hooks/useBanner';
import BannerSkeleton from '../Common/Skeleton/BannerSkeleton';

const Banner = () => {
    const { movie, duration, mediaType, getGenreNames , loading } = useBanner();
    const navigate = useNavigate();

    const truncate = (str: string, n: number) => {
        return str.length > n ? str.slice(0, n - 1) + '...' : str;
    };

    const handleWatch = () => {
        if (movie?.id) {
            navigate(`/${mediaType}/${movie.id}`);
        }
    };

    const releaseDate = movie?.release_date || movie?.first_air_date;
    const formattedDate = releaseDate
        ? new Date(releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    return (
        <div className="">
            {(loading || !movie) ?(
                <BannerSkeleton/>
            ):(<section>
                <div>
                    <img src={getImageUrl(movie.backdrop_path)} alt="title" className='bg-layer' />
                </div>
                <div className="bg-movie-details min-h-[85dvh]">
                    <div
                        className="bg-cover bg-backdrop-before bg-center flex justify-center flex-col min-h-[85dvh]"
                        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
                    >
                        <div className="flex flex-col gap-10 text-white font-bold max-w-2xl px-5 md:pl-20 mt-10">
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-5 lg:gap-10">
                                    {duration && (
                                        <p className='flex items-center gap-2'>
                                            <Clock4 className='size-5' /> {duration}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className='size-5' /> {formattedDate}
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className="text-2xl flex gap-2 items-center">
                                        <Star className='fill-yellow-400 stroke-yellow-400' />
                                        {movie?.vote_average?.toFixed(1)}
                                    </p>
                                    {getGenreNames() && (
                                        <p className='opacity-90'><span>{getGenreNames()}</span></p>
                                    )}
                                </div>
                                <h1 className='text-6xl tracking-widest leading-18'>
                                    {movie?.title || movie?.name || movie?.original_name}
                                </h1>
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
            </section>)}
        </div>
    );
};

export default Banner;
