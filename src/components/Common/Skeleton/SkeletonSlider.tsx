import SkeletonCard from './SkeletonCard';

interface SkeletonSliderProps {
    count?: number;
    isTitle?:boolean;
    isTrailer?: boolean;
    isCast?: boolean;
    isSearch?: boolean;
}

const SkeletonSlider = ({ count = 7, isTitle = true , isTrailer, isCast, isSearch}: SkeletonSliderProps) => {
    return (
        <div className="max-w-[98%] mx-auto pt-10 pb-9 px-5 w-full">
            {isTitle && <div className="animate-pulse h-7 rounded-lg w-full max-w-50 mb-8"></div>}
            <div className="flex w-full overflow-x-clip">
                {Array(count).fill(0).map((_, index) => (
                        <SkeletonCard key={index} index={index} isTrailer={isTrailer} isCast={isCast} isSearch={isSearch}/>
                ))}
            </div>
        </div>
    );
};

export default SkeletonSlider;
