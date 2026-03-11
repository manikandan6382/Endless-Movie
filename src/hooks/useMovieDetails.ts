import { useState, useEffect } from 'react';
import axios from '../helpers/axios';
import type { MovieData, Cast, Videos } from '../types/movieDetails';
import type { Movie } from '../types/movie';


export const useMovieDetails = (type: 'movie' | 'tv', id: string | undefined) => {
  const [banner, setBanner] = useState<MovieData | null>(null);
  const [duration, setDuration] = useState<string>('');
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);


  const [loading, setLoading] = useState({
    banner: true,
    cast: true,
    videos: true,
    similar: true
  });

  useEffect(() => {
    if (!id) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch banner 
    const fetchBanner = async () => {
      setError(null);
      try {
        const res = await axios.get(`/${type}/${id}`);
        setBanner(res.data);

        // Calculate duration
        if (type === 'movie' && res.data.runtime) {
          const hours = Math.floor(res.data.runtime / 60);
          const minutes = res.data.runtime % 60;
          setDuration(`${hours}h ${minutes}m`);
        } else if (type === 'tv' && res.data.episode_run_time?.[0]) {
          const runtime = res.data.episode_run_time[0];
          const hours = Math.floor(runtime / 60);
          const minutes = runtime % 60;
          setDuration(`${hours}h ${minutes}m`);
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error);
        setError('Failed to search movies. Please try again.');
      } finally {
        setLoading(prev => ({ ...prev, banner: false }));
      }
    };

    // Fetch cast 
    const fetchCast = async () => {
      try {
        const res = await axios.get(`/${type}/${id}/credits`);
        setCast(res.data.cast.slice(0, 20));
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      } finally {
        setLoading(prev => ({ ...prev, cast: false }));
      }
    };

    // Fetch videos 
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/${type}/${id}/videos`);
        setVideos(res.data.results);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(prev => ({ ...prev, videos: false }));
      }
    };

    // Fetch similar 
    const fetchSimilar = async () => {
      try {
        const res = await axios.get(`/${type}/${id}/recommendations`);
        setSimilarMovies(res.data.results.slice(0, 25));
      } catch (error) {
        console.error('Failed to fetch similar:', error);
      } finally {
        setLoading(prev => ({ ...prev, similar: false }));
      }
    };

    // Run all in parallel (progressive loading)
    fetchBanner();
    fetchCast();
    fetchVideos();
    fetchSimilar();
  }, [type, id]);

  return {
    banner,
    duration,
    cast,
    videos,
    similarMovies,
    loading,
    error
  };
};
