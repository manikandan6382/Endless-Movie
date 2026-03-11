import { useEffect, useRef, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { LucideSearch } from "lucide-react";
import SearchSuggestion from "../Search/SearchSuggestions";
import { AnimatePresence } from "framer-motion";

interface SearchBarProp {
    bgScroll: boolean;
}

const SearchBar = ({ bgScroll }: SearchBarProp) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { results } = useSearch(query);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null)

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`)
            setShowSuggestions(false);
            setQuery('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={searchRef} className="relative max-w-xl w-full z-10">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 border-r h-5 border-gray-500 flex">
                <LucideSearch
                    className='mr-2 -mt-0.5 text-white/60 cursor-pointer'
                    onClick={handleSearch}
                />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                className={`placeholder:text-white/60 focus:ring outline-0 w-full border-unset pl-15 py-3 rounded-[50rem] placeholder:text-[16px] transition-colors duration-800 ${bgScroll ? 'bg-black/80' : 'bg-black/50'
                    }`}
                placeholder='Search...'
            />
            <AnimatePresence>
                {showSuggestions && (
                    <SearchSuggestion
                        results={results}
                        query={query}
                        onSelect={() => {
                            setShowSuggestions(false);
                            setQuery('');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchBar
