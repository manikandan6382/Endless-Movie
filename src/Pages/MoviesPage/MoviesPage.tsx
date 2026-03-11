import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import ContentFilters from '../../components/ContentFilter/ContentFilter'
import GenreFilter from '../../components/GenreFilter/GenreFilter';
const MoviesPage = ()=>{

    return(
        <div className={`min-h-screen bg-netflix-dark-gray flex flex-col text-white`}>
            <Nav />
            <Banner contentType="movie" />
            <ContentFilters contentType="movie" />
            <GenreFilter contentType="movie" />
        </div>
    )
}

export default MoviesPage; 