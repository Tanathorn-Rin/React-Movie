import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMoviesContext = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movieId) => {
        setFavorites((prev) => {
            if (!prev.includes(movieId)) {
                return [...prev, movieId];
            }
            return prev;
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter(id => id !== movieId));
    };

    const isFavorite = (movieId) => {
        // favorites is an array of movie IDs
        return favorites.includes(movieId);
    }

    const value = { 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite 
    };

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

};