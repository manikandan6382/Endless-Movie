import type { Cast } from '../../types/movieDetails'
import Slider from '../Common/Slider'
import BrokenImage from '../Common/BrokenImage'
import LazyImage from '../Common/LazyImage'
import { getImageUrl } from '../../helpers/imageHelper'
interface castSectionProps {
    cast: Cast[]
}
const CastSection = ({ cast }: castSectionProps) => {

    const createCards = cast.map(actor => (
        <div className="flex gap-4 flex-col text-center shrink-0" key={actor.id}>
            {actor.profile_path ? (

                <LazyImage
                    src={getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.title || actor.name || 'Movie poster'}
                    className="w-full aspect-2/3 object-cover group-hover:scale-110 transition duration-300 rounded-lg"
                />
            ) : (
                <BrokenImage />
            )}
            <div className="font-semibold">
                <p className='text-sm'>{actor.name}</p>
                <p className='font-medium opacity-60 text-[11px] italic'>{actor.character}</p>
            </div>
        </div>
    ))

    return (
        <Slider
            title='Top Cast'
            showNavigation={true}
            slidesPerView={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
        >
            {createCards}
        </Slider>
    )
}

export default CastSection