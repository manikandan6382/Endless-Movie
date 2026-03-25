import { getImageUrl } from '../../helpers/imageHelper';
import { Star, Plus, Play, Clock4, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBanner } from '../../hooks/useBanner';
import BannerSkeleton from '../Common/Skeleton/BannerSkeleton';
import { useState } from 'react';
interface BannerProps {
    contentType?: 'all' | 'movie' | 'tv';
}
const Banner = ({ contentType = 'all' }: BannerProps) => {
    const { movie, duration, mediaType, getGenreNames, loading, error, currentIndex, totalMovies, setCurrentIndex } = useBanner(contentType);
    const navigate = useNavigate();
    const [bgLoaded, setBgLoaded] = useState<number | null>(null);


    const handleWatch = () => {
        if (movie?.id) {
            navigate(`/${mediaType}/${movie.id}`);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + totalMovies) % totalMovies);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % totalMovies);
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
            {error && (
                <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mx-auto max-w-2xl my-8">
                    <p className="font-medium">{error}</p>
                </div>
            )}
            {(loading || !movie) ? (
                <BannerSkeleton isPoster={false}/>
            ) : (
                <section className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <img src={getImageUrl(movie.backdrop_path ?? '')} alt="title" className='bg-layer' />
                                <img
                                    src={getImageUrl(window.innerWidth > 767 ? movie.backdrop_path : movie.poster_path)}
                                    alt=""
                                    loading="lazy"
                                    className="hidden"
                                    onLoad={() => setBgLoaded(currentIndex)}
                                />
                            </div>
                            <div className="bg-movie-details md:min-h-[85dvh] min-h-[50dvh]">
                                <div
                                    className={`bg-cover bg-backdrop-before bg-center flex justify-center flex-col md:min-h-[85dvh] min-h-[50dvh] transition-opacity duration-500 ${bgLoaded === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ backgroundImage: bgLoaded === currentIndex ? `url(${getImageUrl(window.innerWidth > 767 ? movie.backdrop_path : movie.poster_path)})` : 'none' }}
                                >
                                    <div className="flex flex-col gap-10 text-white font-bold max-w-2xl px-5 md:pl-20 mt-10">
                                        <div className="flex flex-col gap-6">
                                            <div className="flex gap-5">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays className='size-5' /> {formattedDate}
                                                </div>
                                                {duration && (
                                                    <p className='flex items-center gap-2'>
                                                        <Clock4 className='size-5' /> {duration}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                {movie?.vote_average && movie.vote_average > 0 && (
                                                    <p className="text-2xl flex gap-2 items-center">
                                                        <Star className='fill-yellow-400 stroke-yellow-400' />
                                                        {movie.vote_average.toFixed(1)}
                                                    </p>
                                                )}
                                                {getGenreNames() && (
                                                    <p className='opacity-90'><span>{getGenreNames()}</span></p>
                                                )}
                                            </div>
                                            <h1 className='md:text-6xl text-4xl tracking-widest leading-12 md:leading-18 w-[95%]'>
                                                {movie?.title || movie?.name || movie?.original_name}
                                            </h1>
                                        </div>
                                        <p className='leading-8 line-clamp-3 '>{movie?.overview || ''}</p>
                                        <div className="flex gap-5 md:pb-15 pb-25">
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
                                                className='text-nowrap font-bold btn-black-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'
                                            >
                                                <Plus />add list
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {totalMovies > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="cursor-pointer absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
                            >
                                <ChevronLeft className="size-8" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
                            >
                                <ChevronRight className="size-8" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {Array.from({ length: totalMovies }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-netflix-red w-8' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            )}
        </div>
    );
};

export default Banner;
