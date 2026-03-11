import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import ContentFilters from '../../components/ContentFilter/ContentFilter'
import GenreFilter from '../../components/GenreFilter/GenreFilter';
const SeriesPage = ()=>{

    return(
        <div className={`min-h-screen bg-netflix-dark-gray flex flex-col text-white`}>
            <Nav />
            <Banner contentType="tv" />
            <ContentFilters contentType="tv" />
            <GenreFilter contentType="tv" />
        </div>
    )
}

export default SeriesPage; 