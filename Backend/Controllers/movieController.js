import axios from "axios";
import Movies from "../Models/Movies.js";


// === SEARCH MOVIES FROM OMDB ===
export const searchMovie = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "query parameter required" });
    }

    const apiKey = process.env.OMDB_API_KEY;

    const response = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// === SAVE MOVIE TO MONGO ===
export const saveMovie = async (req, res) => {
  try {
    const { userId, imdbID } = req.body;

    if (!userId || !imdbID) {
      return res.status(400).json({ error: "userId and imdbID required" });
    }

    const existingMovie = await Movies.findOne({ imdbID, user:userId });

    if (existingMovie) {
      return res.status(400).json({ message: "Movie already saved" });
    }

    const movie = await Movies.create({
      imdbID,
      user: userId,
      title: req.body.title,
      year: req.body.year,
      poster: req.body.poster,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// === GET MOVIE BY MONGODB ID OR OMDB API ===
export const getMovie = async (req, res) => {
  try {
    const { id } = req.params; // ✅ imdbID

    // 1️⃣ Check if movie already exists in DB
    let movie = await Movies.findOne({ imdbID: id });

    if (movie) {
      return res.json(movie);
    }

    // 2️⃣ Fetch from OMDB
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    );

    if (response.data.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }

    // 3️⃣ Return OMDB data (DO NOT AUTO-SAVE)
    return res.json({
      imdbID: response.data.imdbID,
      title: response.data.Title,
      year: response.data.Year,
      poster: response.data.Poster,
      type: response.data.Type,
      imdb_rating: response.data.imdbRating,
      runtime: response.data.Runtime,
      genre: response.data.Genre,
      plot: response.data.Plot,
      director: response.data.Director,
      actors: response.data.Actors,
      language: response.data.Language,
      country: response.data.Country,
      awards: response.data.Awards,
      released: response.data.Released,
    });
  } catch (error) {
    console.error("Error in getMovie:", error);
    res.status(500).json({ error: error.message });
  }
};



// === DELETE MOVIE FOR A SPECIFIC USER ===
export const deleteMovie = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const movie = await Movies.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// === GET ALL MOVIES SAVED BY A USER ===
export const getMoviesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const movies = await Movies.find({ user:userId }).sort({ createdAt: -1 });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
