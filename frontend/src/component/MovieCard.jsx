import "../css/MovieCard.css";
import { useMoviesContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  // Use the shared context for favorites (no local duplicate state)
  const { isFavorite, addToFavorites, removeFromFavorites } = useMoviesContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(event) {
    event.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  }

    // OMDb returns "Poster" which we normalized to `movie.poster` in the API helper.
    // Poster can be the string "N/A" when missing — use a placeholder in that case.
    const placeholder = "https://via.placeholder.com/300x450?text=No+Image";
    const posterSrc = movie?.poster && movie.poster !== "N/A" ? movie.poster : placeholder;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={posterSrc}
          alt={`${movie.title} Poster`}
          className="movie-poster-img"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = placeholder; }}
        />
        <button
          className={`favorite-button ${favorite ? 'active' : ''}`}
          onClick={onFavoriteClick}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year || movie.releaseDate || ""}</p>
      </div>
    </div>
  ); 
}

export default MovieCard;