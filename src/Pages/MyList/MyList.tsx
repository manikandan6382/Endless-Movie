import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../../hooks/useWatchlist";
import { getImageUrl } from "../../helpers/imageHelper";
import { Trash2, Star } from "lucide-react";

const MyList = () => {
    const navigate = useNavigate();
    const { watchlist, removeFromWatchlist, loading } = useWatchlist();

    return (
        <div className="min-h-screen bg-netflix-dark-gray text-white">
            <Nav />
            <div className="pt-20 md:pt-24 pb-20 lg:pb-5 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">My List</h1>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="aspect-2/3 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : watchlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <p className="text-white/50 text-xl">Your list is empty</p>
                        <button
                            onClick={() => navigate('/')}
                            className="btn-netflix-neon px-6 py-3 rounded-full text-sm font-bold uppercase"
                        >
                            Browse Movies
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {watchlist.map(item => (
                            <div key={item.id} className="relative group cursor-pointer">
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={getImageUrl(item.poster_path, 'w342')}
                                        alt={item.title}
                                        onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                                        className="w-full aspect-2/3 object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <button
                                    onClick={() => removeFromWatchlist(item.id)}
                                    className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 opacity-70 group-hover:opacity-100 transition text-white hover:bg-netflix-red"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                                <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-white text-sm truncate font-medium">{item.title}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-400 text-xs">
                                            {new Date(item.release_date || item.first_air_date || '').getFullYear() || ''}
                                        </p>
                                        {item.vote_average > 0 && (
                                            <div className="flex items-center gap-1">
                                                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-white text-xs">{item.vote_average.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyList;
