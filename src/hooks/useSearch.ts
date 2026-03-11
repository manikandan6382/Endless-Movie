import { useEffect, useState } from "react"
import type { SearchResult } from "../types/search"
import axios from "../helpers/axios";

export const useSearch = (query: string) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); 
    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }
        const searchResults = async () => {
            setLoading(true)
            setError(null);
            try {
                const response = await axios.get(`search/multi?query=${query}`)
                const filtered = response.data.results.filter(
                    (item: SearchResult) => item.media_type === 'movie' || item.media_type === 'tv'
                );
                setResults(filtered);
            } catch (error) {
                console.log('Search failed', error);
                setError('Failed to search movies. Please try again.'); 
            } finally {
                setLoading(false)
            }
        }
        const debounce = setTimeout(searchResults, 300);
        return () => clearTimeout(debounce)
    }, [query])
    return {results , loading , error}
}