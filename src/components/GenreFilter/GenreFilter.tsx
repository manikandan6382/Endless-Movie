import Cards from '../Common/Cards';
import Button from '../Common/Button';
import Dropdown from '../Common/Dropdown';
import { useGenreFilter } from '../../hooks/useGenreFilter';
import { SORT_OPTIONS, ORDER_OPTIONS, getYearOptions } from '../../constants/genreData';
import type { ContentType, SortType, OrderType } from '../../types/genreFilter';
import Slider from '../Common/Slider';
import SkeletonSlider from '../Common/Skeleton/SkeletonSlider';

interface GenreFilterProps {
    contentType: ContentType;
}

const GenreFilter = ({ contentType }: GenreFilterProps) => {
    const {
        genres,
        selectedGenres,
        toggleGenreId,
        orderBy,
        setOrderBy,
        sortBy,
        setSortBy,
        selectedYear,
        setSelectedYear,
        genreData,
        loading,
        sortMovies,
        error,
    } = useGenreFilter(contentType);

    const yearOptions = getYearOptions();

    const createCards = genres.map(genre => (
        <div
            key={genre.id}
            className="px-3"
        >
            <Button
                onClick={() => toggleGenreId(genre.id)}
                className={`w-full h-10 max-w-45 ${selectedGenres.includes(genre.id)
                    ? 'bg-netflix-red text-white shadow-lg scale-105'
                    : 'bg-black/90 text-white hover:scale-105'
                    }`}
            >
                {genre.name}
            </Button>
        </div>
    ))

    return (
        <div className="flex flex-col gap-3">
            <Slider
                showNavigation={true}
                slidesPerView={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7, xxxl: 8 }}
                arrowClassName='h-15! flex items-center justify-center top-2/5! mx-0!'
                spaceBetween={0}
            >
                {createCards}
            </Slider>
            {selectedGenres.length > 0 && (
                <div className="flex flex-wrap gap-4 max-w-[95%] mx-auto w-full">
                    <Dropdown
                        value={orderBy}
                        options={ORDER_OPTIONS}
                        onChange={(val) => setOrderBy(val as OrderType)}
                        label="Sort By"
                    />
                    <Dropdown
                        value={sortBy}
                        options={SORT_OPTIONS}
                        onChange={(val) => setSortBy(val as SortType)}
                        label="Order"
                    />
                    <Dropdown
                        value={selectedYear}
                        options={yearOptions}
                        onChange={setSelectedYear}
                        label="Year"
                    />
                </div>
            )}

            {error && (
                <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mx-auto max-w-2xl my-8">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {loading ? (

                <SkeletonSlider count={7} />
            ) : (

                selectedGenres.map(genreId => {
                    const genre = genres.find(g => g.id === genreId);
                    const movies = genreData[genreId] || [];
                    const sortedMovies = sortMovies(movies);
                    if (!genre) return null;

                    if (movies.length === 0) {
                        return (
                            <div key={genreId} className="text-white text-center p-10">
                                <p className="text-lg">No results found for {genre.name}</p>
                            </div>
                        );
                    }
                    return (
                        <Cards
                            key={genreId}
                            title={genre.name}
                            movies={sortedMovies}
                            type={contentType}
                            breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
                        />
                    );
                })
            )
            }

        </div>
    );
};

export default GenreFilter;
