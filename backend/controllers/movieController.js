import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  searchMoviesFromTMDB,
  fetchMovieDetails,
  fetchMovieVideos,
} from "../services/tmdbService.js";

export const getTrendingMovies = async (req, res, next) => {
  try {
    const data = await fetchTrendingMovies();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPopularMovies = async (req, res, next) => {
  try {
    const data = await fetchPopularMovies();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const data = await fetchTopRatedMovies();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const data = await searchMoviesFromTMDB(query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const data = await fetchMovieDetails(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMovieVideos = async (req, res, next) => {
  try {
    const data = await fetchMovieVideos(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};