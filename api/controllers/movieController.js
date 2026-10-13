const movies = [
    {
        id: "m1",
        title: "Spider-Man: No Way Home",
        director: "Jon Watts",
        genre: "Action",
        releaseYear: 2021,
        rating: 8.2
    },
    {
        id: "m2",
        title: "Black Panther",
        director: "Ryan Coogler",
        genre: "Action",
        releaseYear: 2018,
        rating: 7.3
    },
    {
        id: "m3",
        title: "Avengers: Endgame",
        director: "Anthony Russo and Joe Russo",
        genre: "Action",
        releaseYear: 2019,
        rating: 8.4
    },
    {
        id: "m4",
        title: "The Batman",
        director: "Matt Reeves",
        genre: "Crime",
        releaseYear: 2022,
        rating: 7.8
    },
    {
        id: "m5",
        title: "Interstellar",
        director: "Christopher Nolan",
        genre: "Science Fiction",
        releaseYear: 2014,
        rating: 8.7
    }
];

// GET /api/movies
// Retrieve all movies
const getAllMovies = (req, res) => {
    res.status(200).json({
        success: true,
        count: movies.length,
        data: movies
    });
};

// GET /api/movies/:id
// Retrieve a movie by its ID
const getMovieById = (req, res, next) => {
    const movie = movies.find(item => item.id === req.params.id);

    if (!movie) {
        const error = new Error("Movie not found.");
        error.status = 404;
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: movie
    });
};

// POST /api/movies
// Add a new movie to temporary in-memory storage
const createMovie = (req, res) => {
    const newMovie = {
        id: `m${Date.now()}`,
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating
    };

    movies.push(newMovie); 

    res.status(201).json({
        success: true,
        message: "Movie created successfully.",
        data: newMovie
    });
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
};