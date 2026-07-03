import express from "express";
import { getAiMovieRecommendations } from "../controllers/aiController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recommend", protect, getAiMovieRecommendations);

export default router;