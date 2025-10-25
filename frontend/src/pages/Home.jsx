import MovieCard from "../component/MovieCard";
import { useState , useEffect} from "react";
import { searchMovies, getPopularMovies } from "../service/api";
import "../css/Home.css"


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                setLoading(true);
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.log("Error fetching popular movies:", error);
                setError("Failed to fetch popular movies.");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        if (loading) return;

        setLoading(true);
        try {
                const results = await searchMovies(searchQuery);
                setMovies(results);
                setError(null);
        } catch (error) {
            console.log(error);
            setError("Error searching movies.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input type="text" name="searchInput" 
                placeholder="Search for a movie..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies
                        .filter((movie) => {
                            if (!searchQuery.trim()) return true;
                            return movie.title.toLowerCase().startsWith(searchQuery.toLowerCase());
                        })
                        .map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                </div>
            )}
        </div>
    );
}

export default Home;