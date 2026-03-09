import Cards from '../Common/Cards';
import type { Movie } from '../../types/movie';
interface SimilarMoviesProps {
    movies: Movie[];
    type: 'movie' | 'tv';
}

const SimilarMovies = ({ movies, type }: SimilarMoviesProps) => {

    return (
        <>
            <Cards 
                movies={movies}
                type={type}
                title="You Might Also Like"
                breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
            />
        </>
    )
}

export default SimilarMovies