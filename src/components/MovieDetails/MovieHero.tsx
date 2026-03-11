import { getImageUrl } from '../../helpers/imageHelper';
import { Star, Plus, Play, Languages, CalendarDays, Clock4 } from 'lucide-react'
import type { MovieData } from '../../types/movieDetails';
import { useState, useEffect } from 'react';
import LazyImage from '../Common/LazyImage';

interface MovieHeroProps {
    data: MovieData | null;
    duration: string;
    trailerKey?: string | null;
    showTrailer?: boolean;
    onPlayTrailer?: () => void;
    onCloseTrailer?: () => void;
}


const MovieHero = ({ data, duration, trailerKey, showTrailer, onPlayTrailer, onCloseTrailer }: MovieHeroProps) => {
    const [bgLoaded, setBgLoaded] = useState(false);
    useEffect(() => {
        if (data?.backdrop_path) {
            const img = new Image();
            img.src = getImageUrl(data.backdrop_path);
            img.onload = () => setBgLoaded(true);
        }
    }, [data?.backdrop_path]);

    const title = data?.title || data?.name;
    const releaseDate = data?.release_date || data?.first_air_date;
    const formattedDate = releaseDate
        ? new Date(releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';
    const genres = data?.genres.map(g => g.name).join(' | ')

    return (
        <>
            {data?.backdrop_path && (
                <div className="mb-8 relative overflow-hidden">
                    <button
                        onClick={onCloseTrailer}
                        className={`flex flex-col aspect-square absolute cursor-pointer duration-300 bg-black  h-10 items-center justify-center top-1  opacity-70 hover:opacity-100 font-medium text-white right-0 rounded-lg transition z-3 ${showTrailer?'translate-x-[20%]':'translate-x-[150%]'}`}
                    >
                        <span className='text-xl'>✕</span>
                    </button>
                    <div className="">
                        <img src={getImageUrl(data.backdrop_path)} alt="title" className='bg-layer' />
                    </div>
                    <div className="bg-movie-details min-h-[85dvh]">
                        {showTrailer && trailerKey ? (
                            // Show YouTube trailer
                            <div className="relative min-h-[85dvh] bg-black flex items-center justify-center pb-5">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                                    className="w-full h-[85dvh]"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            // Show normal banner
                            <div
                                className={`bg-cover bg-backdrop-before bg-center flex justify-center flex-col min-h-[85dvh] transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ backgroundImage: bgLoaded ? `url(${getImageUrl(data.backdrop_path)})` : 'none' }}
                            >

                                <div className="flex gap-5 lg:gap-20 max-w-6xl mx-auto items-center mt-10 lg:ps-10 px-5">
                                    <div className="shrink-0">
                                        <LazyImage
                                            src={getImageUrl(data.poster_path, 'w342')}
                                            alt={title || 'Movie Poster'}
                                            className='h-100 2xl:h-112.5 rounded-lg shadow-xl aspect-[2.2/3] '
                                        />
                                    </div>
                                    <div className="flex flex-col lg:gap-7 gap-5 font-bold">
                                        <div className="flex gap-4 flex-col">
                                            <div className="flex gap-4 items-center">
                                                <p className="text-2xl flex gap-2 items-center"><Star className='fill-yellow-400 stroke-yellow-400' />{data?.vote_average?.toFixed(1)}</p>
                                                {genres && (
                                                    <p className='opacity-90 pt-1'><span>{genres}</span> </p>
                                                )}
                                            </div>
                                            <h1 className='text-5xl tracking-widest leading-18'>{title}</h1>
                                            <p className='leading-8 font-medium text-lg line-clamp-5'>{data?.overview}</p>
                                        </div>
                                        <div className="flex gap-5 lg:gap-10">
                                            {duration && <div className='flex gap-2 '><Clock4 className='size-5' /> {duration}</div>}
                                            {formattedDate && <div className="flex items-center gap-2"><CalendarDays className='size-5' /> {formattedDate}</div>}
                                            <div className="uppercase flex gap-2">
                                                <Languages className='size-5' />
                                                <div className="flex gap-3 items-center">
                                                    <span className=''>{data.spoken_languages[0]?.name}</span>
                                                    <span className=''>{data.spoken_languages[1]?.name}</span>
                                                    <span className=''>{data.spoken_languages[2]?.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 pb-10">
                                            <button
                                                onClick={onPlayTrailer}
                                                disabled={!trailerKey}
                                                className='font-bold btn-netflix-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full disabled:opacity-50 disabled:cursor-not-allowed!'
                                            >
                                                <Play className='size-5 fill-white' />watch
                                            </button>
                                            <button className='font-bold btn-black-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'><Plus className='' />add list</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieHero