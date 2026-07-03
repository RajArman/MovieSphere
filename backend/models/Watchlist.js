import mongoose from 'mongoose';

const watchlistMovieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  posterPath: {
    type: String,
    default: '',
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    movies: [watchlistMovieSchema],
  },
  {
    timestamps: true,
  }
);

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
