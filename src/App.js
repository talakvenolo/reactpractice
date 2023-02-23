import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=8affc5b2';

const movie1 = {
    "Title": "The Talented Mr. Ripley",
    "Year": "1999",
    "imdbID": "tt0134119",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODA3NDhiZjYtYTk2NS00ZWYwLTljYTQtMjU0NzcyMGEzNTU2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('The Talented Mr. Ripley');
    }, []);

    return (
        <div className="app">
            <h1>MyMovie</h1>

            <div className="search">
                <input
                    placeholder="Search for movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
            ? (
            <div className="container">
                {movies.map((movie) => (
                <MovieCard movie={movie} />
                ))}
            </div>
            ) : (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
            )}
        </div>
    );
}

export default App;