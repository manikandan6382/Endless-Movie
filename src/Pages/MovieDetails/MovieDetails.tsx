import { useParams, Navigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MovieHero from "../../components/MovieDetails/MovieHero";
import CastSection from "../../components/MovieDetails/CastSection";
import TrailersSection from "../../components/MovieDetails/TrailersSection";
import SimilarMovies from "../../components/MovieDetails/SimilarMovies";
import SkeletonSlider from "../../components/Common/Skeleton/SkeletonSlider";
import BannerSkeleton from "../../components/Common/Skeleton/BannerSkeleton";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useState } from "react";

const MovieDetails = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [showTrailer, setShowTrailer] = useState(false);

  // Call hook first (before any conditions)
  const validType =
    type === "movie" || type === "tv" ? (type as "movie" | "tv") : "movie";
  const { banner, duration, cast, videos, similarMovies, loading, error } =
    useMovieDetails(validType, id);

  // Validate type after hooks
  if (type !== "movie" && type !== "tv") {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="pt-20 md:pt-24 pb-20 lg:pb-5 min-h-screen bg-netflix-dark-gray flex flex-col text-white">
      <Nav />
      {error && (
        <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mx-auto max-w-2xl my-8">
          <p className="font-medium">{error}</p>
        </div>
      )}
      {loading.banner ? (
        <BannerSkeleton />
      ) : (
        <MovieHero
          data={banner}
          duration={duration}
          trailerKey={
            videos.find((v) => v.type === "Trailer")?.key ||
            videos.find((v) => v.type === "Teaser")?.key ||
            videos[0]?.key ||
            null
          }
          showTrailer={showTrailer}
          onPlayTrailer={() => setShowTrailer(true)}
          onCloseTrailer={() => setShowTrailer(false)}
        />
      )}

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
