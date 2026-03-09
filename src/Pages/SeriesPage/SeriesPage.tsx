import GenreFilter from '../../components/GenreFilter/GenreFilter';

const SeriesPage = () => {
    return (
        <div className="min-h-screen bg-netflix-black pt-20 px-8">
            <h1 className="text-white text-3xl font-bold mb-6">TV Series</h1>
            <GenreFilter contentType="tv" />
        </div>
    );
};

export default SeriesPage;
