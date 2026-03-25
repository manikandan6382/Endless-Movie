import { useSearchParams, useNavigate } from "react-router-dom"
import { useSearch } from "../../hooks/useSearch";
import Nav from "../../components/Nav/Nav";
import SkeletonCard from "../../components/Common/Skeleton/SkeletonCard";
import { getImageUrl } from "../../helpers/imageHelper";
import { Star } from "lucide-react";
import LazyImage from "../../components/Common/LazyImage";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const { results, loading, error } = useSearch(query);
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-netflix-dark-gray flex flex-col text-white">
            <Nav />
            <div className="max-w-full mx-auto pb-3 pt-20 flex flex-col w-full px-6">
                <h1 className="text-4xl font-bold mb-6">
                    Search Results for "{query}"
                </h1>
                {error && (
                    <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mb-8">
                        <p className="font-medium">{error}</p>
                    </div>
                )}
                {loading ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                        {Array(14).fill(0).map((_, i) => <SkeletonCard key={i} index={i} />)}
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                        {results.map(movie => {
                            const releaseDate = movie.release_date || movie.first_air_date;
                            const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
                            const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
                            return (
                                <div key={movie.id} onClick={() => navigate(`/${mediaType}/${movie.id}`)} className="cursor-pointer group">
                                    <div className="flex flex-col gap-3">
                                        <div className="overflow-hidden rounded-lg drop-shadow-2xl">
                                            <LazyImage
                                                src={getImageUrl(movie.poster_path || '', 'w342')}
                                                alt={movie.title || movie.name || ''}
                                                className="w-full aspect-2/3 object-cover group-hover:scale-110 transition duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-white font-medium truncate">{movie.title || movie.name}</p>
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="text-gray-400 text-sm font-semibold">{year}</p>
                                                {movie.vote_average > 0 ? (
                                                    <div className="flex items-center gap-1">
                                                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
                                                    </div>
                                                ) : (
                                                    <span className="rounded-full tracking-wider bg-black/80 backdrop-blur-md text-white text-[10px] px-4 py-2 flex items-center leading-1 font-bold">NEW</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-400 text-xl">No results found for "{query}"</p>
                )}
            </div>
        </section>
    )
}
export default SearchResults;