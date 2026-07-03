import express from "express";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  searchMovies,
  getMovieDetails,
  getMovieVideos,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);
router.get("/:id/videos", getMovieVideos);

export default router;