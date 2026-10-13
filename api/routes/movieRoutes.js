
const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    createMovie
} = require("../controllers/movieController");

const validateMovie = require("../middleware/validateMovie");

// GET /api/movies - Get all movies
router.get("/", getAllMovies);

// GET /api/movies/:id - Get a movie by ID
router.get("/:id", getMovieById);

// POST /api/movies - Add a movie after validation
router.post("/", validateMovie, createMovie);

module.exports = router;
