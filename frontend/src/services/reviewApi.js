import api from "./api";

export const getMovieReviews = async (tmdbId) => {
  const res = await api.get(`/reviews/${tmdbId}`);
  return res.data;
};

export const addReview = async (reviewData) => {
  const res = await api.post("/reviews", reviewData);
  return res.data;
};

export const deleteReview = async (reviewId) => {
  const res = await api.delete(`/reviews/${reviewId}`);
  return res.data;
};