const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const movieValidation = require("../../validations/movie.validation");
const { movieController } = require("../../controllers/");

const router = express.Router();

router.get("/", auth, movieController.getMovies);

router.post(
  "/",
  auth,
  validate(movieValidation.addMovie),
  movieController.addMovie
);

router.patch(
  "/:movieId",
  auth,
  validate(movieValidation.updateMovie),
  movieController.updateMovie
);

router.delete(
  "/:movieId",
  auth,
  validate(movieValidation.deleteMovie),
  movieController.deleteMovie
);

module.exports = router;
