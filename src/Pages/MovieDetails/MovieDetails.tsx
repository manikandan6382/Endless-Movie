import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import MovieHero from '../../components/MovieDetails/MovieHero';
import CastSection from '../../components/MovieDetails/CastSection';
import TrailersSection from '../../components/MovieDetails/TrailersSection';
import SimilarMovies from '../../components/MovieDetails/SimilarMovies';
import SkeletonSlider from '../../components/Common/Skeleton/SkeletonSlider';
import BannerSkeleton from '../../components/Common/Skeleton/BannerSkeleton';
import { useMovieDetails } from '../../hooks/useMovieDetails';

interface MoviesDetailsProps {
  type: 'movie' | 'tv';
}

const MovieDetails = ({ type }: MoviesDetailsProps) => {
  const { id } = useParams();
  const { banner, duration, cast, videos, similarMovies, loading } = useMovieDetails(type, id);


  return (
    <section className="min-h-screen bg-netflix-dark-gray bg-skel flex flex-col text-white">
      <Nav />
    { loading.banner ? <BannerSkeleton /> : <MovieHero data={banner} duration={duration} /> }

      {loading.cast ? (
        <SkeletonSlider count={7} isCast />
      ) : cast.length > 0 ? (
        <CastSection cast={cast} />
      ) : null}

      {loading.videos ? (
        <SkeletonSlider count={4} isTrailer />
      ) : videos.length > 0 ? (
        <TrailersSection videos={videos} />
      ) : null}

      {loading.similar ? (
        <SkeletonSlider count={7} />
      ) : similarMovies.length > 0 ? (
        <SimilarMovies movies={similarMovies} type={type} />
      ) : null}
    </section>
  );
};

export default MovieDetails;
