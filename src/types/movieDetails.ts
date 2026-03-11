export interface Cast {
  id: number;
  name?: string;
  title?: string;
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