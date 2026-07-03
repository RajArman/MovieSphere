import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/day");
  return response.data;
};

export const fetchPopularMovies = async () => {
  const response = await tmdbApi.get("/movie/popular");
  return response.data;
};

export const fetchTopRatedMovies = async () => {
  const response = await tmdbApi.get("/movie/top_rated");
  return response.data;
};

export const searchMoviesFromTMDB = async (query) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  return response.data;
};