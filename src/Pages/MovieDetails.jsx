import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../service/Supabase";
import useAuth from "../Store/Authstore";
import useMovieStore from "../Store/Apistore"
import Loader from "../Components/Loader";
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
import Spinner from "../Components/Authloader";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Zustand movie store
  const { selectedMovie, fetchMovieDetails, loading, error } = useMovieStore();

  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch movie details using Zustand store
  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  // Check if movie is already saved in Supabase
  useEffect(() => {
    if (user && selectedMovie) {
      checkIfSaved(selectedMovie);
    }
  }, [user, selectedMovie]);

  const checkIfSaved = async (movieData) => {
    try {
      const { data, error } = await supabase
        .from("saved_movies")
        .select("id")
        .eq("user_id", user.id)
        .eq("imdb_id", movieData.imdbID)
        .single();

      if (data && !error) {
        setIsSaved(true);
        setSavedMovieId(data.id);
      } else {
        setIsSaved(false);
        setSavedMovieId(null);
      }
    } catch (err) {
      console.error("Error checking saved status:", err);
    }
  };

  // Save movie
  const handleSaveMovie = async () => {
    if (!user) {
      alert("Please sign in to save movies");
      return;
    }

    if (!selectedMovie) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("saved_movies")
        .insert([
          {
            user_id: user.id,
            imdb_id: selectedMovie.imdbID,
            title: selectedMovie.Title,
            year: selectedMovie.Year,
            poster: selectedMovie.Poster,
            genre: selectedMovie.Genre,
            director: selectedMovie.Director,
            actors: selectedMovie.Actors,
            plot: selectedMovie.Plot,
            imdb_rating: selectedMovie.imdbRating,
            runtime: selectedMovie.Runtime,
            language: selectedMovie.Language,
            country: selectedMovie.Country,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setIsSaved(true);
      setSavedMovieId(data.id);
      alert("Movie saved to your collection!");
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Error saving movie. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Delete movie
  const handleDeleteMovie = async () => {
    if (!savedMovieId) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("saved_movies")
        .delete()
        .eq("id", savedMovieId);

      if (error) throw error;

      setIsSaved(false);
      setSavedMovieId(null);
      alert("Movie removed from your collection!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Error removing movie. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => navigate(-1);

  // --- UI States ---
  if (loading) {
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

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Movie not found</p>
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

  const movie = selectedMovie;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Movies
        </button>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="flex-shrink-0 w-full lg:w-1/3">
            <div className="relative group">
              <img
                src={
                  movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                }
                alt={movie.Title}
                className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>

            {/* Save/Delete Button */}
            <div className="mt-6">
              {!isSaved ? (
                <button
                  onClick={handleSaveMovie}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium rounded-lg transition duration-200"
                >
                  {saving ? (
                    <Spinner size={30} color="green"/>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5" />
                      Save to Collection
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleDeleteMovie}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium rounded-lg transition duration-200"
                >
                  {saving ? (
                    <Loader />
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Remove from Collection
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.Title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-gray-300">{movie.Year}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Film className="w-4 h-4" />
                  <span className="text-gray-300">{movie.Runtime}</span>
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
            {movie.Genre && movie.Genre !== "N/A" && (
              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Director / Cast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.Director && movie.Director !== "N/A" && (
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Director</span>
                  </div>
                  <p className="text-white">{movie.Director}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== "N/A" && (
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Cast</span>
                  </div>
                  <p className="text-white">{movie.Actors}</p>
                </div>
              )}
            </div>

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-200">
                  Synopsis
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.Plot}
                </p>
              </div>
            )}

            {/* Extra Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {movie.Language && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="text-white font-medium">{movie.Language}</div>
                </div>
              )}
              {movie.Country && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="text-white font-medium">{movie.Country}</div>
                </div>
              )}
              {movie.BoxOffice && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Box Office</div>
                  <div className="text-white font-medium">{movie.BoxOffice}</div>
                </div>
              )}
              {movie.Released && (
                <div className="bg-gray-800/20 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Released</div>
                  <div className="text-white font-medium">{movie.Released}</div>
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
