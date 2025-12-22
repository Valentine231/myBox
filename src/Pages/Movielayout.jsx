import React, { useEffect } from "react";
// import useMovies from "../Store/Apistore";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import Navbar from "../Components/Nav";
import Footer from "../Components/Footer";
import useMovies11 from "../Store/fetch";

const Movielayout = () => {
  const {
    loading,
    error,
    query,
    searchPerformed,
    getDisplayMovies,
    fetchDefaultMovies,
  } = useMovies11();

  useEffect(() => {
  fetchDefaultMovies();
}, [fetchDefaultMovies]); // only run on mount


  const displayMovies = getDisplayMovies();

  return (
    <div className="p-4">
      <Navbar />
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div>
          {searchPerformed && displayMovies.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No movies found for "{query}"
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayMovies.map((movie,index) => (
              <Card  key={`${movie.imdbID}-${index}`}movie={movie} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Movielayout;
