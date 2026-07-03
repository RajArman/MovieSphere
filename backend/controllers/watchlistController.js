// Watchlist controllers — to be implemented
import Watchlist from "../models/Watchlist.js";

export const getWatchlist = async (req, res, next) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist) {
      watchlist = await Watchlist.create({
        user: req.user._id,
        movies: [],
      });
    }

    res.json(watchlist.movies);
  } catch (error) {
    next(error);
  }
};

export const addToWatchlist = async (req, res, next) => {
  try {
    const { tmdbId, title, posterPath } = req.body;

    let watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist) {
      watchlist = await Watchlist.create({
        user: req.user._id,
        movies: [],
      });
    }

    const alreadyExists = watchlist.movies.some(
      (movie) => movie.tmdbId === tmdbId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Movie already in watchlist",
      });
    }

    watchlist.movies.push({ tmdbId, title, posterPath });
    await watchlist.save();

    res.json({
      success: true,
      message: "Movie added to watchlist",
      movies: watchlist.movies,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWatchlist = async (req, res, next) => {
  try {
    const { tmdbId } = req.params;

    const watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist) {
      return res.status(404).json({
        success: false,
        message: "Watchlist not found",
      });
    }

    watchlist.movies = watchlist.movies.filter(
      (movie) => movie.tmdbId !== Number(tmdbId)
    );

    await watchlist.save();

    res.json({
      success: true,
      message: "Movie removed from watchlist",
      movies: watchlist.movies,
    });
  } catch (error) {
    next(error);
  }
};