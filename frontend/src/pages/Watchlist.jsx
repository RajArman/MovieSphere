import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getWatchlist } from "../services/userMovieApi";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await getWatchlist();

      const formatted = data.map((movie) => ({
        id: movie.tmdbId,
        title: movie.title,
        posterPath: movie.posterPath
          ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
          : null,
      }));

      setMovies(formatted);
    };

    loadWatchlist();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Watchlist</h1>
        <p className="page-subtitle">Movies you plan to watch</p>
      </div>

      {movies.length > 0 ? (
        <div className="grid-movies">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2 className="empty-state-title">Your watchlist is empty</h2>
          <p>Add movies to your watchlist to keep track of what you want to see</p>
        </div>
      )}
    </div>
  );
}

export default Watchlist;