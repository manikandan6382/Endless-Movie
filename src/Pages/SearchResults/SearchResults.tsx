import { useSearchParams } from "react-router-dom"
import { useSearch } from "../../hooks/useSearch";
import Nav from "../../components/Nav/Nav";
import SkeletonSlider from "../../components/Common/Skeleton/SkeletonSlider";
import Cards from "../../components/Common/Cards";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const { results, loading, error } = useSearch(query);

    return (
        <section className="min-h-screen bg-netflix-dark-gray flex flex-col text-white">
            <Nav />
            <div className="flex gap-5 justify-between max-w-full mx-auto pb-3 pt-10 flex-col w-full">
                <h1 className="text-4xl font-bold mb-4 px-6">
                    Search Results for "{query}"
                </h1>
                {error && (
                    <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mb-8">
                        <p className="font-medium">{error}</p>
                    </div>
                )}
                {loading ? (
                <SkeletonSlider count={7} />
            ) : results.length > 0 ? (
                <Cards
                    title=""
                    movies={results}
                    type="all"
                    breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
                />
                ) : (
                    <p className="text-gray-400 text-xl">No results found for "{query}"</p>
                )}
            </div>
        </section>
    )
}
export default SearchResults;