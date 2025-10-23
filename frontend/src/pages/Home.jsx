import MovieCard from "../component/movie";

function Home() {
    const movies = [
        { id: 1, title: "Inception", releaseDate: "2010" },
        { id: 2, title: "The Matrix", releaseDate: "1999" },
        { id: 3, title: "Interstellar", releaseDate: "2014" }
    ];

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = event.target.elements.searchInput.value;
        console.log("Searching for:", query);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input type="text" name="searchInput" placeholder="Search for a movie..." className="search-input" />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movie-grid">
                {movies.map(movie => (<MovieCard movie={movie} key={movie.id}/>))}
            </div>
        </div>
    );
}

export default Home;