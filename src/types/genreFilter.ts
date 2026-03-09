export type SortType = 'latest' | 'top_rated';
export type OrderType = 'asc' | 'desc';
export type ContentType = 'all' | 'movie' | 'tv';

export interface Genre {
    id: number;
    name: string;
    endpoint: string;
}
