import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/movieApi";
import Loader from "../components/Loader";

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchMovies(query);

      const formattedMovies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        releaseYear: movie.release_date
          ? movie.release_date.substring(0, 4)
          : "N/A",
        rating: movie.vote_average.toFixed(1),
      }));

      setMovies(formattedMovies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      handleSearch(query);
    }
  }, [searchParams]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Search Movies</h1>
        <p className="page-subtitle">
          Find films by title, genre, or keyword
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search for a movie..."
      />

      {loading ? (
        <Loader text="Searching movies..." />
      ) : movies.length > 0 ? (
        <div className="grid-movies" style={{ marginTop: "2rem" }}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: "3rem" }}>
          <div className="empty-state-icon">🔍</div>
          <h2 className="empty-state-title">Start Searching</h2>
          <p>Enter a movie title above to discover films.</p>
        </div>
      )}
    </div>
  );
}

export default Search;