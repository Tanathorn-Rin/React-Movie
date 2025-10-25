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

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert("Searching for " + searchQuery);
        setSearchQuery("");
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

            {loading ? <div>Loading...</div> : <div className="movie-grid">
                {movies.map(movie => 
                    movie.title.toLocaleLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={movie.id}/>))}
            </div>}
        </div>
    );
}

export default Home;