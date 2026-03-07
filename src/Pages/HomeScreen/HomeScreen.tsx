import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import ContentFilters from '../../components/ContentFilter/ContentFilter'
import GenreFilter from '../../components/GenreFilter/GenreFilter';
const HomeScreen = ()=>{

    return(
        <div className={`bg-netflix-dark-gray`}>
            <Nav />
            <Banner/>
            <ContentFilters contentType="all" />
            <GenreFilter contentType="all" />
        </div>
    )
}

export default HomeScreen; 