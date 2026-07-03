import express from "express";
import {
  getMovieReviews,
  addReview,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:tmdbId", getMovieReviews);
router.post("/", protect, addReview);
router.delete("/:id", protect, deleteReview);

export default router;