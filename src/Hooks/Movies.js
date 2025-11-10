import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "7a047e7a";
const BASE_URL = "https://www.omdbapi.com/";

const useMovies = (initialQuery = "batman") => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieList, setMovieList] = useState([]); // Separate state for displayed movies
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchMovies = async (searchTerm = query) => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      setData([]);
      setMovieList([]);
      setSearchPerformed(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await axios.get(`${BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
      const result = response.data;

      if (result.Response === "True") {
        setData(result.Search);
        setMovieList(result.Search); // Update both data and movieList
      } else {
        setData([]);
        setMovieList([]);
        setError(result.Error || "No movies found");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Network or API error");
      setData([]);
      setMovieList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    // Don't clear movieList immediately - let fetchMovies handle it
  };

  const fetchMovieDetails = async (imdbID) => {
    if (!imdbID) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError("Could not fetch movie details");
    } finally {
      setLoading(false);
    }
  };

  // Smart movie list management
  const getDisplayMovies = () => {
    // If search was performed and we have results, show search results
    if (searchPerformed && movieList.length > 0) {
      return movieList;
    }
    // If search was performed but no results, return empty array
    if (searchPerformed && movieList.length === 0) {
      return [];
    }
    // If no search performed yet, return initial data (or you could return popular movies)
    return data;
  };

  // Reset to initial state
  const resetSearch = () => {
    setQuery(initialQuery);
    setSearchPerformed(false);
    setError(null);
  };

  // Clear search results but keep the query
  const clearResults = () => {
    setMovieList([]);
    setSearchPerformed(false);
    setError(null);
  };

  // Fetch movies when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && query.length >= 3) {
        fetchMovies(query);
      } else if (query.length === 0) {
        setMovieList([]);
        setSearchPerformed(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return {
    // Main data
    data, // Original search results
    movieList: getDisplayMovies(), // Smart movie list for display
    query,
    setQuery: handleSearch,
    loading,
    error,
    selectedMovie,
    fetchMovieDetails,
    
    // Additional utilities
    searchPerformed,
    resetSearch,
    clearResults,
    hasResults: getDisplayMovies().length > 0,
  };
};

export default useMovies;