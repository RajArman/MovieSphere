// Favorites controllers — to be implemented
import Favorites from "../models/Favorites.js";

export const getFavorites = async (req, res, next) => {
  try {
    let favorites = await Favorites.findOne({ user: req.user._id });

    if (!favorites) {
      favorites = await Favorites.create({
        user: req.user._id,
        movies: [],
      });
    }

    res.json(favorites.movies);
  } catch (error) {
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const { tmdbId, title, posterPath } = req.body;

    let favorites = await Favorites.findOne({ user: req.user._id });

    if (!favorites) {
      favorites = await Favorites.create({
        user: req.user._id,
        movies: [],
      });
    }

    const alreadyExists = favorites.movies.some(
      (movie) => movie.tmdbId === tmdbId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Movie already in favorites",
      });
    }

    favorites.movies.push({
      tmdbId,
      title,
      posterPath,
    });

    await favorites.save();

    res.json({
      success: true,
      message: "Movie added to favorites",
      movies: favorites.movies,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromFavorites = async (req, res, next) => {
  try {
    const { tmdbId } = req.params;

    const favorites = await Favorites.findOne({
      user: req.user._id,
    });

    if (!favorites) {
      return res.status(404).json({
        success: false,
        message: "Favorites not found",
      });
    }

    favorites.movies = favorites.movies.filter(
      (movie) => movie.tmdbId !== Number(tmdbId)
    );

    await favorites.save();

    res.json({
      success: true,
      message: "Movie removed from favorites",
      movies: favorites.movies,
    });
  } catch (error) {
    next(error);
  }
};