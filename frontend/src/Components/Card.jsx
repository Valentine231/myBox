import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!movie?.imdbID) return;
    navigate(`/movie/${movie.imdbID}`);
  };

  const poster =
    movie?.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      onClick={handleNavigate}
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer bg-gray-900 text-white hover:scale-105 transition"
    >
      <img
        className="w-full h-64 object-cover"
        src={poster}
        alt={movie?.Title || "Movie poster"}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">
          {movie?.Title || "Untitled Movie"}
        </div>
        <p className="text-gray-400">
          {movie?.Year || "Unknown year"}
        </p>
      </div>
    </div>
  );
};

export default Card;
