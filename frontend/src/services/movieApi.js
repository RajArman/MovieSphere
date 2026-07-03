import api from "./api";

export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending");
  return res.data;
};

export const getPopularMovies = async () => {
  const res = await api.get("/movies/popular");
  return res.data;
};

export const getTopRatedMovies = async () => {
  const res = await api.get("/movies/top-rated");
  return res.data;
};

export const searchMovies = async (query) => {
  const res = await api.get(`/movies/search?query=${query}`);
  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

export const getMovieVideos = async (id) => {
  const res = await api.get(`/movies/${id}/videos`);
  return res.data;
};