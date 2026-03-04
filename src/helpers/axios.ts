// axios.ts
import axios from "axios";

const API_KEY = "013296bc89622c9c00d4d17f6641e4d7";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY 
    }
})

export default instance
