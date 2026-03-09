import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import ContentFilters from '../../components/ContentFilter/ContentFilter'
import GenreFilter from '../../components/GenreFilter/GenreFilter';
const HomeScreen = ()=>{

    return(
        <div className={`min-h-screen bg-netflix-dark-gray bg-skel flex flex-col text-white`}>
            <Nav />
            <Banner/>
            <ContentFilters contentType="all" />
            <GenreFilter contentType="all" />
        </div>
    )
}

export default HomeScreen; 