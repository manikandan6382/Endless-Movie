import { ImageOffIcon } from 'lucide-react'

const BrokenImage = () => {
    return (
        <div className="w-full lg:min-w-38 aspect-2/3 rounded-lg mb-2 items-center justify-center shadow-xl backdrop-blur-[60px]  bg-black/30 flex gap-2">
            <ImageOffIcon className='size-5' />
            No Image
        </div>
    )
}

export default BrokenImage