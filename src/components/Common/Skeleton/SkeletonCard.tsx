interface SkeletonCardProps {
    index?: number;
    isTrailer?: boolean;
    isCast?: boolean;
}

const SkeletonCard = ({ index = 0, isTrailer, isCast, }: SkeletonCardProps) => {
    return (
        <div className={`shrink-0 w-full grow ${isTrailer ? 'max-w-1/2 md:max-w-1/3 lg:max-w-1/4 2xl:max-w-1/5' : ' max-w-1/3 md:max-w-1/4 lg:max-w-1/5 xl:max-w-1/6 2xl:max-w-1/7'}`}>
            <div className={`flex flex-col gap-3 me-4`}>
                <div
                    style={{ animationDelay: `${index * 500}ms` }}
                    className="animate-pulse drop-shadow-2xl overflow-hidden rounded-lg"
                >
                    <div className={`${isTrailer ? 'aspect-2/1' : 'aspect-2/3 py-5'} rounded-lg`}></div>
                </div>
                {isTrailer ? (

                    <div className="flex flex-col gap-2 mt-1">
                        <div
                            style={{ animationDelay: `${index * 500}ms` }}
                            className="animate-pulse h-3 rounded-xl w-6/10"
                        ></div>
                    </div>
                ) : isCast ? (
                    <div className="flex flex-col gap-2 items-center">
                        <div
                            style={{ animationDelay: `${index * 500}ms` }}
                            className="animate-pulse h-3 rounded-xl w-6/10"
                        ></div>
                        <div
                            style={{ animationDelay: `${index * 500}ms` }}
                            className="animate-pulse h-3 rounded-xl w-5/10"
                        ></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div
                            style={{ animationDelay: `${index * 500}ms` }}
                            className="animate-pulse h-3 rounded-xl w-6/10"
                        ></div>
                        <div className="flex gap-3 justify-between">
                            <div
                                style={{ animationDelay: `${index * 500}ms` }}
                                className="animate-pulse h-3 rounded-xl w-1/4"
                            ></div>
                            <div
                                style={{ animationDelay: `${index * 500}ms` }}
                                className="animate-pulse h-3 rounded-xl w-1/4"
                            ></div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default SkeletonCard;
