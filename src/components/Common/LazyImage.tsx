import { useState } from 'react';
import BrokenImage from './BrokenImage';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
}

const LazyImage = ({ src, alt, className = '' }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <BrokenImage/>
        );
    }

    return (
        <div className="relative rounded-lg overflow-hidden">
            {/* Skeleton while loading */}
            {!isLoaded && (
                <div className={`absolute! inset-0 animate-pulse`}></div>
            )}
            
            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`transition-all duration-500 ${
                    isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                } ${className}`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
            />
        </div>
    );
};

export default LazyImage;
