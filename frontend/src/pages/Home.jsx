import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../services/movieApi";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

const handleSearch = (query) => {
  if (!query.trim()) return;
  navigate(`/search?query=${encodeURIComponent(query)}`);
};

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getTrendingMovies();

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="page home-page">
      <section className="hero">
        <span className="hero-badge">Discover Your Next Favorite</span>

        <h1 className="hero-title">
          Explore Movies with{" "}
          <span className="hero-title-accent">MovieSphere</span>
        </h1>

        <p className="hero-subtitle">
          Search, track and explore movies from around the world.
        </p>

        <div className="hero-search">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search Movies..."
          />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>

          <Link to="/search" className="section-link">
            View all →
          </Link>
        </div>

        {loading ? (
          <h3>Loading Movies...</h3>
        ) : (
          <div className="grid-movies">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;