function MovieCard({ movie }) {
    
    function onFavoriteClick() {
        alert("clicked");
    }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} alt={`${movie.title} Poster`} className="movie-poster" />
        <button className="favorite-button" onClick={onFavoriteClick}>❤️</button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;