import { Link } from 'react-router-dom'
import './MovieCard.css'

function MovieCard({ movie }) {
  const { id, title, posterPath, releaseYear, rating } = movie

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="movie-card-poster">
        {posterPath ? (
          <img src={posterPath} alt={title} loading="lazy" />
        ) : (
          <div className="movie-card-placeholder">🎬</div>
        )}
        {rating && (
          <span className="movie-card-rating">★ {rating}</span>
        )}
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{title}</h3>
        {releaseYear && (
          <p className="movie-card-year">{releaseYear}</p>
        )}
      </div>
    </Link>
  )
}

export default MovieCard
