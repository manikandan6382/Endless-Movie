import { useState } from 'react'
import Swiper from '../Common/Slider';
import { Play } from 'lucide-react';
import type { Videos } from '../../types/movieDetails';
import { motion, AnimatePresence } from 'framer-motion';

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
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-screen h-screen bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-10 right-0 text-white text-3xl hover:text-netflix-red cursor-pointer transition"
                            >
                                ✕
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                className="w-full h-full rounded-lg"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

export default TrailersSection