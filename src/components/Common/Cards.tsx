import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../helpers/imageHelper';
import { Star } from 'lucide-react';
import Slider from '../Common/Slider';
import type { Movie } from '../../types/movie';
import LazyImage from './LazyImage';
interface cardSectionProps {
    movies: Movie[];
    type: 'all' | 'movie' | 'tv';
    title?: string;
    arrowClassName?: string;
    breakPoints: {
        mobile?: number | undefined;
        md?: number | undefined;
        lg?: number | undefined;
        xl?: number | undefined;
        xxl?: number | undefined;
        xxxl?: number | undefined;
    }
}
const Cards = ({ movies, type, title, breakPoints, arrowClassName }: cardSectionProps) => {

    const navigate = useNavigate()
    const createCards = movies.map(movie => {
        const releaseDate = movie.release_date || movie.first_air_date;
        const formattedDate = releaseDate
            ? new Date(releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
            })
            : '';
        const getNavigationType = () => {
            if (type !== 'all') return type
            return movie.media_type || (movie.title ? 'movie' : 'tv');
        }
        return (
            <div
                key={movie.id}
                onClick={() => navigate(`/${getNavigationType()}/${movie.id}`)}
                className="cursor-pointer group aspect-2/3"
            >
                <div className="flex flex-col gap-4">
                    <div className="drop-shadow-2xl">
                        <div className="overflow-hidden rounded-lg">
                            <LazyImage
                                src={getImageUrl(movie.poster_path, 'w342')}
                                alt={movie.title || movie.name || 'Movie poster'}
                                className="w-full aspect-2/3 object-cover group-hover:scale-110 transition duration-300 "
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-medium truncate">{movie.title || movie.name}</p>
                        <div className="flex items-center justify-between gap-3">
                            <p className='text-gray-400 text-sm font-semibold'>{formattedDate}</p>
                            <div className=" flex items-center gap-1">
                                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <Slider
                title={title}
                lazy={true}
                preloadImages={false}
                watchSlidesProgress={true}
                showNavigation={true}
                slidesPerView={breakPoints}
                arrowClassName={arrowClassName}
            >
                {createCards}
            </Slider>
        </>
    )
}

export default Cards