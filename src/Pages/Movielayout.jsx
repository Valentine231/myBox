import React, { useEffect } from "react";
import useMovies from "../Store/Apistore";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import Navbar from "../Components/Nav";
import Footer from "../Components/Footer";

const Movielayout = () => {
  const {
    movieList,
    loading,
    error,
    query,
    searchPerformed,
    getDisplayMovies,
    fetchDefaultMovies,
  } = useMovies();

  useEffect(() => {
    fetchDefaultMovies(); // load default list on mount
  }, []);

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
            {displayMovies.map((movie) => (
              <Card key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Movielayout;
