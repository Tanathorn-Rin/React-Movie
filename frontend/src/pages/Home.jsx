import MovieCard from "../component/movie";
import React from "react";

function Home() {
    const [searchQuery, setSearchQuery] = React.useState("");

    const movies = [
        { id: 1, title: "Inception", releaseDate: "2010" },
        { id: 2, title: "The Matrix", releaseDate: "1999" },
        { id: 3, title: "Interstellar", releaseDate: "2014" }
    ];

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert("Searching for " + searchQuery);
        setSearchQuery("------------");
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
            <div className="movie-grid">
                {movies.map(movie => 
                    movie.title.toLocaleLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={movie.id}/>))}
            </div>
        </div>
    );
}

export default Home;