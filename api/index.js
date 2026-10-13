
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Controlled CORS configuration.
// Add any additional trusted frontend origins to this list.
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow tools such as Postman that do not send an Origin header.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        const error = new Error("Origin not allowed by CORS.");
        error.status = 403;
        return callback(error);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Root endpoint.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Movies API.",
        endpoints: {
            health: "/health",
            movies: "/api/movies"
        }
    });
});

// Health-check endpoint.
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        message: "Movies API is running."
    });
});

// Movie resource routes.
app.use("/api/movies", movieRoutes);

// Return a JSON response for unknown routes.
app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// Central error handler must be registered last.
app.use(errorHandler);

// Start the server.
app.listen(PORT, () => {
    console.log(`Movies API running at http://localhost:${PORT}`);
});
