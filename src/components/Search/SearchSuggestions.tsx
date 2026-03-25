import { useNavigate } from "react-router-dom";
import type { SearchResult } from "../../types/search"
import LazyImage from "../Common/LazyImage";
import { getImageUrl } from "../../helpers/imageHelper";
import { motion } from "framer-motion";

interface searchSuggestionProp {
    results: SearchResult[];
    onSelect: () => void;
    query: string;
    isMobile?: boolean;
}

const SearchSuggestion = ({ results, onSelect, query }: searchSuggestionProp) => {
    const navigate = useNavigate();
    
    if (results.length === 0 && query.length > 2) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-black/95 rounded-lg p-4"
            >
                <p className="text-white/60">No result found</p>
            </motion.div>
        )
    }

    if(results.length > 0){
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 rounded-lg max-h-96 overflow-y-auto border border-gray-800"
        >
            {results.slice(0, 35).map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    className="flex items-center gap-4 px-5 cursor-pointer py-4 hover:bg-black transition duration-300"
                    onClick={() => {
                        navigate(`/${item.media_type}/${item.id}`)
                        onSelect()
                    }}
                >
                    <LazyImage
                        src={getImageUrl(item.poster_path || '', 'w92')}
                        alt={item.title || item.name || 'Movie Poster'}
                        className="md:w-18 md:h-18 min-h-12 min-w-12 h-12 w-12 shrink-0 object-cover rounded"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-white font-medium">{item.title || item.name}</p>
                        <p className="text-gray-400 text-sm capitalize">{item.media_type}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )}
}

export default SearchSuggestion;
