import { useState } from 'react'
import type { Videos } from '../../Pages/MovieDetails/MovieDetails'
import Swiper from '../Common/Slider';
import { Play } from 'lucide-react';
interface TrailerSectionProps {
    videos: Videos[]
}
const TrailersSection = ({ videos }: TrailerSectionProps) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>('')
    const trailers = videos.filter(v =>
        v.site === 'YouTube' &&
        (v.type === 'Trailer' || v.type === 'Teaser' || v.type === 'Clip')
    )
    if (trailers.length === 0) return null;

    const createCards = trailers.map(video => (
        <div
            key={video.id}
            onClick={() => setSelectedVideo(video.key)}
            className="relative cursor-pointer group"
        >
            <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className="w-full aspect-video rounded-lg object-cover"
            />
            <div className="absolute inset-0 transition flex items-center justify-center rounded-lg">
                <Play className="size-12 drop-shadow-2xl" fill="white" />
            </div>
            <p className=" mt-2 font-medium truncate">{video.name}</p>
        </div>
    ))
    return (
        <>
            <Swiper
                title='Trailer & Clips'
                showNavigation={true}
                slidesPerView={{ mobile: 2, md: 3, lg: 4, xxl: 5 }}
            >
                {createCards}
            </Swiper>
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/90 z-3 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="relative w-full max-w-5xl aspect-video"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-10 right-0 text-white text-3xl hover:text-netflix-red"
                        >
                            ✕
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            className="w-full h-full rounded-lg"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default TrailersSection