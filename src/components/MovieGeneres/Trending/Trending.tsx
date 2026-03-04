import {useState} from 'react'
import Cards from '../../Common/Cards'
interface SimilarMoviesProps {
    movies: Movie[];
    type: 'movie' | 'tv';
}

const Trending = () => {
    const [movies, setMovies] = useState([])
     return (
         <>
             <Cards 
                 data={movies}
                 type={type}
                 title="You Might Also Like"
                 breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
             />
         </>
     )
}

export default Trending