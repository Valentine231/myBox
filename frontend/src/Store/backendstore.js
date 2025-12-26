import { create } from "zustand";
import axios from "axios";

// 🔐 API KEYS & URLS (clean)
const API_KEY = "7a047e7a";
const OMDB_URL = "https://www.omdbapi.com/";
const BACKEND_URL = "http://localhost:5000/api/movies";

const useBackendstore = create((set, get) => ({
  movieList: [],           // Default backend movies
  searchResults: [],       // Live search movies
  selectedMovie: null,
  query: "",
  loading: false,
  error: null,
  searchPerformed: false,
  debounceTimeout: null,

  // ============================================
  // ✅ 1. FETCH DEFAULT MOVIES (from your backend)
  // ============================================
  fetchDefaultMovies: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${BACKEND_URL}/fetch?search=batman`);
      set({ movieList: res.data });
    } catch (error) {
      console.error("Backend default movie error:", error);
      set({ movieList: [], error: "Failed to load movies from backend" });
    } finally {
      set({ loading: false });
    }
  },

  // ============================================
  // ✅ 2. LIVE SEARCH FROM OMDB
  // ============================================
  fetchSearchMovies: async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      set({ searchResults: [], searchPerformed: false });
      return;
    }

    set({ loading: true, error: null, searchPerformed: true });

    try {
      const res = await axios.get(
        `${OMDB_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`
      );

      if (res.data.Response === "True") {
        set({ searchResults: res.data.Search });
      } else {
        set({ searchResults: [], error: res.data.Error });
      }
    } catch (error) {
      console.error("Search API error:", error);
      set({ error: "Search request failed", searchResults: [] });
    } finally {
      set({ loading: false });
    }
  },

  // ============================================
  // ✅ 3. FETCH MOVIE DETAILS (OMDB)
  // ============================================
  fetchMovieDetails: async (imdbID) => {
    if (!imdbID) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${OMDB_URL}?i=${imdbID}&apikey=${API_KEY}`);
      set({ selectedMovie: res.data });
    } catch (error) {
      console.error("Movie details fetch error:", error);
      set({ error: "Failed to load movie details" });
    } finally {
      set({ loading: false });
    }
  },

  // ============================================
  // 🔥 4. SEARCH INPUT (DEBOUNCE)
  // ============================================
  setQuery: (query) => {
    set({ query });

    const { fetchSearchMovies } = get();
    clearTimeout(get().debounceTimeout);

    const timeout = setTimeout(() => {
      if (query.length >= 3) {
        fetchSearchMovies(query);
      } else {
        set({ searchResults: [], searchPerformed: false });
      }
    }, 500);

    set({ debounceTimeout: timeout });
  },

  // ============================================
  // 🎬 5. WHAT TO DISPLAY (Default or Search)
  // ============================================
  getDisplayMovies: () => {
    const { searchPerformed, searchResults, movieList } = get();
    return searchPerformed ? searchResults : movieList;
  },

  // ============================================
  // 🧹 6. RESET SEARCH
  // ============================================
  resetSearch: () =>
    set({ query: "", searchPerformed: false, searchResults: [] }),
}));

export default useBackendstore;
