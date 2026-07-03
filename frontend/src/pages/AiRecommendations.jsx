import { useState } from "react";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";
import { getAiRecommendations } from "../services/aiApi";

function AiRecommendations() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRecommend = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter what kind of movie you want.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setMovies([]);

      const data = await getAiRecommendations(prompt);

      if (data.fallback) {
        toast.info("Gemini is temporarily unavailable. Showing backup recommendations.");
      }

      if (!data.movies || data.movies.length === 0) {
        setMessage("No matching movies found. Try a simpler prompt.");
        return;
      }

      const formattedMovies = data.movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        releaseYear: movie.release_date
          ? movie.release_date.substring(0, 4)
          : "N/A",
        rating: movie.vote_average?.toFixed(1),
      }));

      setMovies(formattedMovies);
      toast.success("Recommendations ready!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section
        style={{
          padding: "3rem",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(6,182,212,0.12))",
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "2rem",
        }}
      >
        <div className="page-header">
          <h1 className="page-title">🤖 AI Movie Recommendations</h1>
          <p className="page-subtitle">
            Describe the kind of movie you want, and MovieSphere will suggest films for you.
          </p>
        </div>

        <div className="hero-search">
          <input
            className="search-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: mind-bending thriller with strong ending"
          />

          <button
            className="btn btn-primary"
            onClick={handleRecommend}
            disabled={loading}
          >
            {loading ? "Finding..." : "Recommend"}
          </button>
        </div>

        <div style={{ marginTop: "1rem", opacity: 0.85 }}>
          Try: <strong>movies like Interstellar</strong>,{" "}
          <strong>dark detective thriller</strong>,{" "}
          <strong>emotional anime movie</strong>
        </div>
      </section>

      {loading && (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h2 className="empty-state-title">Finding movies...</h2>
          <p>MovieSphere is preparing recommendations for you.</p>
        </div>
      )}

      {message && !loading && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2 className="empty-state-title">{message}</h2>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <section>
          <div className="section-header">
            <h2 className="section-title">Recommended Movies</h2>
          </div>

          <div className="grid-movies">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AiRecommendations;