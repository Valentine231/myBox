import { create } from "zustand";
import axios from "axios";
import useBackendAuthStore from "./BackendAuthstore";   // ✅ ADDED (to access userId)

// const BACKEND_URL = "http://localhost:5000/api/movies";
const API_URL = `${import.meta.env.VITE_API_URL}/api/movies`;  // ✅ ADDED (from .env)

const useMovies11 = create((set, get) => ({
  movieList: [],
  searchResults: [],
  query: "",
  loading: false,
  error: null,
  selectedMovie: null,
  searchPerformed: false,
  debounceTimeout: null,

  // === FETCH MOVIE DETAILS (MongoDB) ===
  fetchMovieDetails: async (id) => {
    if (!id) return;
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/${id}`);
      set({ selectedMovie: res.data });
    } catch (error) {
      console.error("Error fetching movie:", error);
      set({ error: "Could not fetch movie details" });
    } finally {
      set({ loading: false });
    }
  },

  // === SAVE MOVIE TO MONGODB (with userId) ===
  saveMovieToDB: async (movie) => {
     const {user} = useBackendAuthStore.getState();  // ✅ ADDED

    if(!user?._id) return;

    await axios.post(API_URL + "/save", {
      userId: user._id,   // ✅ ADDED
      imdbID:movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    });

  },

  // === DELETE MOVIE FROM MONGODB ===
  deleteMovieFromDB: async (movieId) => {
    try {
      await axios.delete(`${API_URL}/${movieId}`);
    } catch (error) {
      console.error("Delete movie error:", error);
    }
  },

  // === FETCH ALL SAVED MOVIES FOR LOGGED IN USER ===
  getSavedMovies: async () => {                  // ✅ NEW FUNCTION ADDED
    const { user } = useBackendAuthStore.getState();

    if (!user) return [];

    set({ loading: true });

    try {
      const res = await axios.get(`${API_URL}/saved/${user._id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching saved movies:", error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  // === FETCH DEFAULT MOVIES ===
  fetchDefaultMovies: async (defaultQuery = "superman") => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/search?query=${defaultQuery}`);
      set({ movieList: res.data.Search || [] });
    } catch (error) {
      console.error("Default movie fetch error:", error);
      set({ movieList: [], error: "Backend/Network error" });
    } finally {
      set({ loading: false });
    }
  },

  // === SEARCH MOVIES ===
  fetchSearchMovies: async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 3) {
      return set({ searchResults: [], searchPerformed: false });
    }

    set({ loading: true, error: null, searchPerformed: true });

    try {
      const res = await axios.get(`${API_URL}/search?query=${searchTerm}`);
      set({ searchResults: res.data.Search || [] });
    } catch (error) {
      console.error("Search movie fetch error:", error);
      set({ searchResults: [], error: "Backend/Network error" });
    } finally {
      set({ loading: false });
    }
  },

  setQuery: (query) => {
    set({ query });
    const { fetchSearchMovies } = get();

    clearTimeout(get().debounceTimeout);

    const debounceTimeout = setTimeout(() => {
      if (query.length >= 3) {
        fetchSearchMovies(query);
      } else {
        set({ searchResults: [], searchPerformed: false });
      }
    }, 500);

    set({ debounceTimeout });
  },

  getDisplayMovies: () => {
    const { searchPerformed, searchResults, movieList } = get();
    return searchPerformed ? searchResults : movieList;
  },

  resetSearch: () => set({ query: "", searchPerformed: false, searchResults: [] }),
}));

export default useMovies11;
