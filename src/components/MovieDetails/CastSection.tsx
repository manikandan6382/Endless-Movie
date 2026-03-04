import type { Cast } from '../../Pages/MovieDetails/MovieDetails'
import { getImageUrl } from '../../helpers/imageHelper'
import { ImageOffIcon } from 'lucide-react'
import Slider from '../Common/Slider'
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
                <div className="w-full lg:min-w-38 aspect-2/3 rounded-lg mb-2 items-center justify-center shadow-xl backdrop-blur-[60px]  bg-black/30 flex gap-2">
                    <ImageOffIcon className='size-5' />
                    No Image
                </div>
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