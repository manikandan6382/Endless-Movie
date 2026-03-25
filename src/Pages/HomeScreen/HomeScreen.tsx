import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import ContentFilters from '../../components/ContentFilter/ContentFilter'
import GenreFilter from '../../components/GenreFilter/GenreFilter';

const HomeScreen = () => {
    return (
        <div className="min-h-screen bg-netflix-dark-gray flex flex-col text-white">
            <Nav />
            {/* Add padding for fixed navigation */}
            <div className="pt-20 md:pt-24 pb-20 md:pb-0">
                <Banner contentType="all" />
                <ContentFilters contentType="all" />
                <GenreFilter contentType="all" />
            </div>
        </div>
    )
}

export default HomeScreen; 