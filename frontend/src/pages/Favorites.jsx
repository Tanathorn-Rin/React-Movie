import "../css/Favorites.css"
import { useMoviesContext } from "../contexts/MovieContext";
import MovieCard from "../component/MovieCard";
import { useEffect, useState } from "react";
import { getMovieById } from "../service/api";

function Favorites() {
    const { favorites, removeFromFavorites } = useMoviesContext();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const loadFavorites = async () => {
            if (!favorites || favorites.length === 0) {
                setMovies([]);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const promises = favorites.map((id) => getMovieById(id));
                const results = await Promise.all(promises);
                if (!mounted) return;
                setMovies(results.filter(Boolean));
            } catch (err) {
                console.error(err);
                if (mounted) setError("Failed to load favorite movies.");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadFavorites();
        return () => { mounted = false };
    }, [favorites]);

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites">
                <div className="favorites-empty">
                    <h2>No favorite movies added yet.</h2>
                    <p>Start adding some!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites">
            <h1>Your Favorite Movies</h1>
            {loading && <div>Loading favorites...</div>}
            {error && <div className="error-message">{error}</div>}
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;