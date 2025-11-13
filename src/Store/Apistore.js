import { create } from "zustand";
import axios from "axios";

const API_KEY = "7a047e7a";
const BASE_URL = "https://www.omdbapi.com/";

const useMovies = create((set, get) => ({
  movieList: [], // Pre-existing (default) movies
  searchResults: [], // Movies from search
  query: "",
  loading: false,
  error: null,
  selectedMovie: null,
  searchPerformed: false,

  // ✅ Fetch default movies (e.g., "batman") once at startup
  fetchDefaultMovies: async (defaultQuery = "batman") => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${BASE_URL}?s=${encodeURIComponent(defaultQuery)}&apikey=${API_KEY}`
      );
      if (res.data.Response === "True") {
        set({ movieList: res.data.Search });
      } else {
        set({ movieList: [], error: res.data.Error || "No movies found" });
      }
    } catch (error) {
      console.error("Default movie fetch error:", error);
      set({ movieList: [], error: "Network or API error" });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Fetch movies for a search term
  fetchSearchMovies: async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      set({ searchResults: [], searchPerformed: false });
      return;
    }

    set({ loading: true, error: null, searchPerformed: true });
    try {
      const res = await axios.get(
        `${BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`
      );
      if (res.data.Response === "True") {
        set({ searchResults: res.data.Search });
      } else {
        set({ searchResults: [], error: res.data.Error || "No movies found" });
      }
    } catch (error) {
      console.error("Search movie fetch error:", error);
      set({ searchResults: [], error: "Network or API error" });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Fetch a specific movie's full details
  fetchMovieDetails: async (imdbID) => {
    if (!imdbID) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
      set({ selectedMovie: res.data });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      set({ error: "Could not fetch movie details" });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ For input updates
  setQuery: (query) => {
    set({ query });
    const { fetchSearchMovies } = get();
    clearTimeout(get().debounceTimeout);
    const debounceTimeout = setTimeout(() => {
      if (query && query.length >= 3) {
        fetchSearchMovies(query);
      } else {
        set({ searchResults: [], searchPerformed: false });
      }
    }, 500);
    set({ debounceTimeout });
  },

  // ✅ Combine logic: decide what to display
  getDisplayMovies: () => {
    const { searchPerformed, searchResults, movieList } = get();
    return searchPerformed ? searchResults : movieList;
  },

  resetSearch: () => set({ query: "", searchPerformed: false, searchResults: [] }),
}));

export default useMovies;
