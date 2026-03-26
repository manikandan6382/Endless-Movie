
const BannerSkeleton = ({isPoster = true} : {isPoster?: boolean}) => {
    return (
            <div className="">
                    <div className="bg-movie-details min-h-[85dvh]">
                        <div className="bg-cover bg-backdrop-before bg-center flex justify-center flex-col min-h-[85dvh]">
                            <div className="">

                                <div className="flex gap-5 lg:gap-20 max-w-6xl mx-auto items-center mt-10 lg:ps-10 px-5 flex-wrap lg:flex-nowrap justify-center lg:justify-start">

                                   { isPoster && <div className="bg-skel animate-pulse h-100 rounded-lg shadow-xl w-full max-w-75">
                                    </div>}
                                    <div className="w-full flex gap-8 flex-col max-w-2xl">
                                        <div className="flex gap-3">
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                        </div>
                                        <div className="animate-pulse h-9 rounded-lg w-full max-w-100"></div>
                                        <div className="flex gap-3 flex-col">
                                            <div className="animate-pulse h-5 rounded-lg w-full"></div>
                                            <div className="animate-pulse h-5 rounded-lg w-full"></div>
                                            <div className="animate-pulse h-5 rounded-lg w-full"></div>
                                            <div className="animate-pulse h-5 rounded-lg w-2/4"></div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                            <div className="animate-pulse h-6 rounded-lg w-full max-w-25"></div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="animate-pulse h-11 rounded-full w-full max-w-45"></div>
                                            <div className="animate-pulse h-11 rounded-full w-full max-w-45"></div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
    );
};

export default BannerSkeleton;
