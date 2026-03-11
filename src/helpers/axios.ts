// axios.ts
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
    throw new Error('TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env file');
}

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY 
    }
})

export default instance
