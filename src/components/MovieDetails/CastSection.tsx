import type { Cast } from '../../Pages/MovieDetails/MovieDetails'
import { getImageUrl } from '../../helpers/imageHelper'
import Slider from '../Common/Slider'
import BrokenImage from '../Common/BrokenImage'
interface castSectionProps {
    cast: Cast[]
}
const CastSection = ({ cast }: castSectionProps) => {

    const createCards = cast.map(actor => (
        <div className="flex gap-4 flex-col text-center shrink-0" key={actor.id}>
            {actor.profile_path ? (
                <img src={getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    className='w-full lg:min-w-38 aspect-2/3 rounded-lg mb-2 shadow-xl'
                />
            ) : (
                <BrokenImage/>
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
            slidesPerView={{ mobile: 2, md: 5, lg: 7, xxxl: 8 }}
        >
            {createCards}
        </Slider>
    )
}

export default CastSection