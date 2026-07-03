import mongoose from 'mongoose';

const favoriteMovieSchema = new mongoose.Schema({
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

const favoritesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    movies: [favoriteMovieSchema],
  },
  {
    timestamps: true,
  }
);

const Favorites = mongoose.model('Favorites', favoritesSchema);

export default Favorites;
