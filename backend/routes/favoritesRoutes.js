import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favoritesController.js";
import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/", protect, addToFavorites);
router.delete("/:tmdbId", protect, removeFromFavorites);

export default router;