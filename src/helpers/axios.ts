// axios.ts
import axios from "axios";

const isDev = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
    baseURL: isDev ? 'https://api.themoviedb.org/3' : '/api/tmdb',
    ...(isDev && { params: { api_key: API_KEY } }),
})

export default instance
