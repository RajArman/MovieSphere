import api from "./api";

export const getAiRecommendations = async (prompt) => {
  const res = await api.post("/ai/recommend", { prompt });
  return res.data;
};