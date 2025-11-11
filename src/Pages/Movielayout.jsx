import React from "react";
import useMovies from "../Hooks/Movies";
import SearchBar from "../Components/Search";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import Navbar from "../Components/Nav";
import Footer from "../Components/Footer";

const Movielayout = () => {
  const { 
    movieList, 
    query, 
    setQuery, 
    loading, 
    error, 
    searchPerformed,
    hasResults 
  } = useMovies("batman");

  return (
    <div className="p-4">
      <Navbar />
     
      
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Smart display logic */}
      {!loading && !error && (
        <div>
          {searchPerformed && !hasResults && (
            <p className="text-gray-500 text-center py-8">
              No movies found for "{query}"
            </p>
          )}
          
          {hasResults && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movieList.map((movie) => (
                <Card key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}

          {!searchPerformed && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Search for movies above</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movieList.map((movie) => (
                  <Card key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Movielayout;