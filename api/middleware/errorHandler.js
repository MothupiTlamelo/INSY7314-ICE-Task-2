
/**
 * Central error-handling middleware.
 * Handles errors passed through next(error).
 */
function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error."
    });
}

module.exports = errorHandler;
