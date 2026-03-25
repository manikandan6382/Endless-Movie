import { useEffect, useRef, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import SearchSuggestion from "../Search/SearchSuggestions";
import { AnimatePresence } from "framer-motion";

interface SearchBarProp {
    bgScroll: boolean;
    isMobile?: boolean;
}

const SearchBar = ({ bgScroll, isMobile = false }: SearchBarProp) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { results } = useSearch(query);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
            setShowSuggestions(false);
            setQuery('');
            inputRef.current?.blur();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
        if (e.key === 'Escape') {
            setShowSuggestions(false);
            inputRef.current?.blur();
        }
    };

    const clearSearch = () => {
        setQuery('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-focus on mobile when component mounts
    useEffect(() => {
        if (isMobile && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isMobile]);

    return (
        <div ref={searchRef} className={`relative w-full z-10 ${isMobile ? 'max-w-none' : 'max-w-xl'}`}>
            <div className="relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white/60 z-10">
                    <Search className="w-5 h-5" />
                </div>
                
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        setShowSuggestions(true);
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full pl-12 pr-12 py-3 rounded-full
                        bg-black/60 backdrop-blur-sm
                        border border-white/20
                        text-white placeholder:text-white/60
                        focus:outline-none focus:ring-2 focus:ring-netflix-red/50 focus:border-netflix-red/50
                        transition-all duration-200
                        ${isFocused ? 'bg-black/80' : ''}
                        ${bgScroll ? 'bg-black/80' : 'bg-black/50'}
                        ${isMobile ? 'text-lg py-4' : 'text-base'}
                    `}
                    placeholder={isMobile ? 'Search movies, TV shows...' : 'Search...'}
                />
                
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
            
            <AnimatePresence>
                {showSuggestions && query.trim() && (
                    <SearchSuggestion
                        results={results}
                        query={query}
                        onSelect={() => {
                            setShowSuggestions(false);
                            setQuery('');
                        }}
                        isMobile={isMobile}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
