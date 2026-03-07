import { getImageUrl } from '../../helpers/imageHelper';
import { Star, Plus, Play, Languages, CalendarDays, Clock4 } from 'lucide-react'
import type { MovieData } from '../../Pages/MovieDetails/MovieDetails';
interface MovieHeroProps {
    data: MovieData | null;
    duration: string;
}

const MovieHero = ({ data, duration }: MovieHeroProps) => {
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
                <div className="mb-8">
                    <div className="">
                        <img src={getImageUrl(data.backdrop_path)} alt="title" className='bg-layer' />
                    </div>
                    <div className="bg-movie-details min-h-[85dvh] 2xl:min-h-[85dvh]">
                        <div className="bg-cover bg-backdrop-before bg-center flex justify-center flex-col min-h-[85dvh] 2xl:min-h-[85dvh]"
                            style={{ backgroundImage: `url(${getImageUrl(data.backdrop_path)})` }}
                        >
                            <div className="flex gap-5 lg:gap-20 max-w-6xl mx-auto items-center mt-10 lg:ps-10 px-5">
                                <div className="shrink-0">
                                    <img src={getImageUrl(data.poster_path, 'w342')} alt={title} className='h-100 2xl:h-112.5 rounded-lg shadow-xl aspect-[2.2/3] ' />
                                </div>
                                <div className="flex flex-col lg:gap-7 gap-5 font-bold">
                                    <div className="flex gap-5 flex-col">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-2xl flex gap-2 items-center"><Star className='fill-yellow-400 stroke-yellow-400' />{data?.vote_average?.toFixed(1)}</p>
                                            {genres && (
                                                <p className='opacity-90 pt-1'><span>{genres}</span> </p>
                                            )}
                                        </div>
                                        <h1 className='text-5xl tracking-widest leading-18'>{title}</h1>
                                        <p className='leading-8 font-medium text-lg line-clamp-4'>{data?.overview}</p>
                                    </div>
                                    <div className="flex gap-5 lg:gap-10">
                                        {duration && <div className='flex gap-2 '><Clock4 className='size-5' /> {duration}</div>}
                                        {formattedDate && <div className="flex items-center gap-2"><CalendarDays className='size-5' /> {formattedDate}</div>}
                                        <div className="uppercase flex gap-2">
                                            <Languages className='size-5' />
                                            {data.spoken_languages[0]?.name}
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <button className='font-bold btn-netflix-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'><Play className='size-5 fill-white ' />watch</button>
                                        <button className='font-bold btn-black-neon flex items-center gap-4 h-12 text-sm px-6 max-w-45 w-full justify-center uppercase rounded-full'><Plus className='' />add list</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieHero