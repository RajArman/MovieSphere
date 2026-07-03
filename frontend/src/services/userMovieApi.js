import api from "./api";

export const getWatchlist = async () => {
  const res = await api.get("/watchlist");
  return res.data;
};

export const addToWatchlist = async (movie) => {
  const res = await api.post("/watchlist", movie);
  return res.data;
};

export const removeFromWatchlist = async (tmdbId) => {
  const res = await api.delete(`/watchlist/${tmdbId}`);
  return res.data;
};

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};

export const addToFavorites = async (movie) => {
  const res = await api.post("/favorites", movie);
  return res.data;
};

export const removeFromFavorites = async (tmdbId) => {
  const res = await api.delete(`/favorites/${tmdbId}`);
  return res.data;
};