import { getMovieNamesFromPrompt } from "../services/geminiService.js";
import { searchMoviesFromTMDB } from "../services/tmdbService.js";

export const getAiMovieRecommendations = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const movieNames = await getMovieNamesFromPrompt(prompt);


    const movieResults = [];

  for (const movieName of movieNames) {
  try {
    const tmdbData = await searchMoviesFromTMDB(movieName);

    if (tmdbData.results && tmdbData.results.length > 0) {
      movieResults.push(tmdbData.results[0]);
    }
  } catch (err) {
    
  }
}

   

    res.json({
      success: true,
      movies: movieResults,
    });
  }catch (error) {
    console.error("AI Recommendation Full Error:", error);
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data);

   res.json({
  success: true,
  fallback: true,
  movies: [
    { id: 157336, title: "Interstellar", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", release_date: "2014-11-05", vote_average: 8.5 },
    { id: 27205, title: "Inception", poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", release_date: "2010-07-15", vote_average: 8.4 },
    { id: 329865, title: "Arrival", poster_path: "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", release_date: "2016-11-10", vote_average: 7.6 },
    { id: 78, title: "Blade Runner 2049", poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", release_date: "2017-10-04", vote_average: 7.6 },
    { id: 286217, title: "The Martian", poster_path: "/3ndAx3weG6KDkJIRMCi5vXX6Dyb.jpg", release_date: "2015-09-30", vote_average: 7.7 }
  ],
  message: "Gemini quota exceeded, showing fallback recommendations."
});
  }
};