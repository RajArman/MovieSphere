import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/movieApi";
import { addToWatchlist, addToFavorites } from "../services/userMovieApi";
import { getMovieReviews, addReview, deleteReview } from "../services/reviewApi";
import "./MovieDetails.css";
import { toast } from "react-toastify";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const videoData = await getMovieVideos(id);
        const officialTrailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (officialTrailer) {
          setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
        }

        const reviewData = await getMovieReviews(id);
        setReviews(reviewData.reviews);
      } catch (err) {
      
      }
    };

    loadMovie();
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist({
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
      toast.success("Added to watchlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add to watchlist");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await addToFavorites({
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
     toast.success("Added to favorites");
    } catch (error) {
     toast.error(
  error.response?.data?.message || "Could not add to Favorites"
);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        tmdbId: movie.id,
        movieTitle: movie.title,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      const reviewData = await getMovieReviews(id);
      setReviews(reviewData.reviews);
    toast.success("Review added");
    } catch (error) {
    toast.error(
  error.response?.data?.message || "Could not submit review"
);
    }
  };

  const handleDeleteReview = async (reviewId) => {
  try {
    await deleteReview(reviewId);

    const reviewData = await getMovieReviews(id);
    setReviews(reviewData.reviews);

   toast.success("Review deleted");
  } catch (error) {
    toast.error(
  error.response?.data?.message || "Could not delete review"
);
  }
};

 if (!movie)
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎬</div>
      <h2 className="empty-state-title">Loading Movie...</h2>
      <p>Please wait while we fetch the details.</p>
    </div>
  );

  return (
    <div className="page">
      <div className="movie-details-layout">
        <img
          className="movie-details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="movie-details-content">
          <h1>{movie.title}</h1>

          <div className="movie-details-meta">
            <span className="movie-details-tag accent">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="movie-details-tag">{movie.release_date}</span>
            <span className="movie-details-tag">{movie.runtime} min</span>
          </div>

          <p className="movie-details-overview">{movie.overview}</p>

          <div className="movie-details-actions">
            <button className="btn btn-primary" onClick={handleAddToWatchlist}>
              Add to Watchlist
            </button>
            <button className="btn btn-outline" onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
          </div>

          {trailer && (
            <>
              <h2>Trailer</h2>
              <iframe
                width="700"
                height="400"
                src={trailer}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </>
          )}

          <section style={{ marginTop: "2rem" }}>
            <h2>User Reviews</h2>

            <form onSubmit={handleReviewSubmit}>
              <label>Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: "100%", minHeight: "100px", marginTop: "1rem" }}
              />

              <button className="btn btn-primary" type="submit">
                Submit Review
              </button>
            </form>

            <div style={{ marginTop: "1.5rem" }}>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="movie-details-tag" style={{ display: "block", marginBottom: "1rem" }}>
                    <strong>{review.user?.username || "User"}</strong>
                    <p>⭐ {review.rating}/10</p>
                    <p>{review.comment}</p>
                    <button
  className="btn btn-outline"
  type="button"
  onClick={() => handleDeleteReview(review._id)}
>
  Delete
</button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;