
/**
 * Validates the request body when creating a movie.
 * Required fields: title, director, genre, releaseYear, rating.
 */
const validateMovie = (req, res, next) => {
    const { title, director, genre, releaseYear, rating } = req.body;
    const errors = [];

    if (typeof title !== "string" || !title.trim()) {
        errors.push("Title is required and must be a non-empty string.");
    }

    if (typeof director !== "string" || !director.trim()) {
        errors.push("Director is required and must be a non-empty string.");
    }

    if (typeof genre !== "string" || !genre.trim()) {
        errors.push("Genre is required and must be a non-empty string.");
    }

    if (!Number.isInteger(releaseYear) ||
        releaseYear < 1888 ||
        releaseYear > new Date().getFullYear() + 5) {
        errors.push("Release year must be a valid integer.");
    }

    if (typeof rating !== "number" ||
        !Number.isFinite(rating) ||
        rating < 0 ||
        rating > 10) {
        errors.push("Rating must be a number between 0 and 10.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Input validation failed.",
            errors
        });
    }

    next();
};

module.exports = validateMovie;
