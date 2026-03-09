import GenreFilter from '../../components/GenreFilter/GenreFilter';

const MoviesPage = () => {
    return (
        <div className="min-h-screen bg-netflix-black pt-20 px-8">
            <h1 className="text-white text-3xl font-bold mb-6">Movies</h1>
            <GenreFilter contentType="movie" />
        </div>
    );
};

export default MoviesPage;
