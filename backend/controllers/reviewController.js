// Review controllers — to be implemented
import Review from "../models/Review.js";

export const getMovieReviews = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const reviews = await Review.find({ tmdbId }).populate(
      "user",
      "username"
    );

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { tmdbId, movieTitle, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      tmdbId,
      movieTitle,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await Review.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};