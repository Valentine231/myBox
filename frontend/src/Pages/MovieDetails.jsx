import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import useAuth from "../Store/Authstore";
import useBackendAuthStore from "../Store/BackendAuthstore";
import useMovies11 from "../Store/fetch";
import Loader from "../Components/Loader";
import Spinner from "../Components/Authloader";

import {
  Star,
  Calendar,
  Users,
  Film,
  Award,
  ArrowLeft,
  Bookmark,
  Trash2,
  Heart,
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useBackendAuthStore();

  const {
    selectedMovie,
    fetchMovieDetails,
    loading,
    error,
    saveMovieToDB,
    deleteMovieFromDB,
    getSavedMovies,
  } = useMovies11();

  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState(null);
  const [saving, setSaving] = useState(false);

  // --- Normalize movie data ---
  const normalizeMovie = (movie) => {
    if (!movie) return {};
    return {
      title: movie.Title || movie.title || "",
      year: movie.Year || movie.year || "",
      poster: movie.Poster || movie.poster || "",
      runtime: movie.Runtime || movie.runtime || "",
      genre: movie.Genre || movie.genre || "",
      plot: movie.Plot || movie.plot || "",
      director: movie.Director || movie.director || "",
      actors: movie.Actors || movie.actors || "",
      language: movie.Language || movie.language || "",
      country: movie.Country || movie.country || "",
      boxOffice: movie.BoxOffice || movie.boxOffice || "",
      released: movie.Released || movie.released || "",
      imdbRating: movie.imdbRating || movie.rating || "",
      imdbVotes: movie.imdbVotes || movie.imdb_votes || "",
      imdbID: movie.imdbID || "",
      type: movie.Type || movie.type || "",
    };
  };

  const movie = normalizeMovie(selectedMovie);

  // --- FETCH MOVIE DETAILS ---
  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id]);

  // --- CHECK IF MOVIE IS SAVED (MongoDB) ---
  useEffect(() => {
    const loadSavedState = async () => {
      if (!user || !selectedMovie) return;

      const saved = await getSavedMovies();
      const match = saved.find((m) => m.imdbID === selectedMovie.imdbID);

      if (match) {
        setIsSaved(true);
        setSavedMovieId(match._id);
      } else {
        setIsSaved(false);
        setSavedMovieId(null);
      }
    };
    loadSavedState();
  }, [user, selectedMovie]);

  // --- SAVE MOVIE ---
  const handleSaveMovie = async () => {
    if (!user) return alert("Please sign in to save movies.");

    setSaving(true);
    const saved = await saveMovieToDB({
      imdbID: movie.imdbID,
      title: movie.title,
      poster: movie.poster,
      year: movie.year,
      runtime: movie.runtime,
      genre: movie.genre,
      plot: movie.plot,
      director: movie.director,
      actors: movie.actors,
      language: movie.language,
      country: movie.country,
      boxOffice: movie.boxOffice,
      released: movie.released,
      imdbRating: movie.imdbRating,
    });

    if (saved && saved._id) {
      setIsSaved(true);
      setSavedMovieId(saved._id);
      alert("Movie saved!");
    }
    setSaving(false);
    navigate("/savedMovies");

  };

  // --- DELETE MOVIE ---
  const handleDeleteMovie = async () => {
    if (!savedMovieId) return;

    setSaving(true);
    await deleteMovieFromDB(savedMovieId);
    setIsSaved(false);
    setSavedMovieId(null);
    alert("Movie removed!");
    setSaving(false);
  };

  const handleBack = () => navigate(-1);

  // ===== UI STATES =====
  if (loading || !selectedMovie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN UI =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Movies
        </button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="flex-shrink-0 w-full lg:w-1/3">
            <div className="relative group">
              <img
                src={movie.poster || "/placeholder.png"}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* SAVE / DELETE BUTTON */}
            <div className="mt-6">
              {!isSaved ? (
                <button
                  onClick={handleSaveMovie}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium rounded-lg transition duration-200"
                >
                  {saving ? <Spinner size={30} /> : <>
                    <Bookmark className="w-5 h-5" />
                    Save to Collection
                  </>}
                </button>
              ) : (
                <button
                  onClick={handleDeleteMovie}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium rounded-lg transition duration-200"
                >
                  {saving ? <Loader /> : <>
                    <Trash2 className="w-5 h-5" />
                    Remove from Collection
                  </>}
                </button>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-gray-300">{movie.year}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Film className="w-4 h-4" />
                  <span className="text-gray-300">{movie.runtime}</span>
                </div>
                {isSaved && (
                  <div className="flex items-center gap-1 text-green-400">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-gray-300">Saved</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{movie.imdbRating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <div className="h-6 w-px bg-gray-600"></div>
                <span className="text-gray-300">{movie.imdbVotes} votes</span>
              </div>
            )}

            {/* Genre Tags */}
            {movie.genre && (
              <div className="flex flex-wrap gap-2">
                {movie.genre.split(", ").map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Director / Cast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.director && (
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Director</span>
                  </div>
                  <p className="text-white">{movie.director && movie.director}</p>
                </div>
              )}
              {movie.actors && (
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Cast</span>
                  </div>
                  <p className="text-white">{movie.actors}</p>
                </div>
              )}
            </div>

            {/* Plot */}
            {movie.plot && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-200">
                  Synopsis
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.plot}</p>
              </div>
            )}

            {/* Extra Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {movie.language && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="text-white font-medium">{movie.language}</div>
                </div>
              )}
              {movie.country && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="text-white font-medium">{movie.country}</div>
                </div>
              )}
              {movie.boxOffice && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Box Office</div>
                  <div className="text-white font-medium">{movie.boxOffice}</div>
                </div>
              )}
              {movie.released && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Released</div>
                  <div className="text-white font-medium">{movie.released}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
