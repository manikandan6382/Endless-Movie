export interface Movie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: string;
    original_name: string;
    genre_ids: number[];
    overview: string;
    backdrop_path: string;
}