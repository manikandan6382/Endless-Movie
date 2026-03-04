import axios from '../../helpers/axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../../components/Nav/Nav';
import MovieHero from '../../components/MovieDetails/MovieHero';
import CastSection from '../../components/MovieDetails/CastSection';
import TrailersSection from '../../components/MovieDetails/TrailersSection';
import SimilarMovies from '../../components/MovieDetails/SimilarMovies';


export interface MovieData {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres: { id: number; name: string }[];
  original_language: string;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
}
interface MoviesDetailsProps {
  type: 'movie' | 'tv'
}
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Videos {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}
export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

const MovieDetails = ({ type }: MoviesDetailsProps) => {
  const { id } = useParams();
  const [data, setData] = useState<MovieData | null>(null);
  const [duration, setDuration] = useState<string>('');
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Videos[]>([])
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/${type}/${id}`)
      setData(response.data)
      if (type === 'movie' && response.data.runtime) {
        const hours = Math.floor(response.data.runtime / 60);
        const minutes = response.data.runtime % 60;
        setDuration(`${hours}h ${minutes}m`);
      } else if (type === 'tv' && response.data.episode_run_time?.[0]) {
        const runtime = response.data.episode_run_time?.[0]
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        setDuration(`${hours}h ${minutes}m`);
      }

      const creditsResponse = await axios.get(`/${type}/${id}/credits`);
      setCast(creditsResponse.data.cast.slice(0, 20))

      const videosResponse = await axios.get(`${type}/${id}/videos`);
      setVideos(videosResponse.data.results);

      const similarResponse = await axios.get(`/${type}/${id}/recommendations`)
      setSimilarMovies(similarResponse.data.results.slice(0, 20));

    }
    fetchData()
  }, [type, id])
  if (!data) return <div className="text-white text-center mt-20">Loading...</div>


  return (
    <section className='min-h-screen bg-netflix-dark-gray flex flex-col text-white'>
      <Nav />
      <MovieHero data={data} duration={duration} />
      {cast.length > 0 && <CastSection cast={cast} />}
      {videos.length > 0 && <TrailersSection videos={videos} />}
      {similarMovies.length > 0 && <SimilarMovies movies={similarMovies} type={type} />}
    </section>
  )
}
export default MovieDetails