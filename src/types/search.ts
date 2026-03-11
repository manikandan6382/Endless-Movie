export interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    original_name?: string;
    media_type: 'movie' | 'tv';
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
    overview?: string;
}
