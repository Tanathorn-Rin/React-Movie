const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const getPopularMovies = async (searchQuery) => {
    // OMDB doesn't have a /movie/popular endpoint; this is kept for compatibility if using another API.
    // If you're using OMDB, use `s` or `i` query parameters. Example search by title:
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery || "batman")}`);
    const data = await response.json();
    return data.Search || [];
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.Search || [];
}