import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../services/userMovieApi";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await getFavorites();

      const formatted = data.map((movie) => ({
        id: movie.tmdbId,
        title: movie.title,
        posterPath: movie.posterPath
          ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
          : null,
      }));

      setMovies(formatted);
    };

    loadFavorites();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Favorites</h1>
        <p className="page-subtitle">Movies you love</p>
      </div>

      {movies.length > 0 ? (
        <div className="grid-movies">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">❤️</div>
          <h2 className="empty-state-title">No favorites yet</h2>
          <p>Mark movies as favorites to build your personal collection</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
