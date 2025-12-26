// import { create } from "zustand";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000/api/movies";

// const useMovies = create((set, get) => ({
//   movieList: [],
//   searchResults: [],
//   query: "",
//   loading: false,
//   error: null,
//   selectedMovie: null,
//   searchPerformed: false,

//   // ✅ Fetch default movies using backend (searchMovie controller)
//   fetchDefaultMovies: async (defaultQuery = "batman") => {
//     set({ loading: true, error: null });
//     try {
//       const res = await axios.get(`${BACKEND_URL}/search?query=${defaultQuery}`);

//       set({ movieList: res.data.movies || [] });
//     } catch (error) {
//       console.error("Default movie fetch error:", error);
//       set({ movieList: [], error: "Backend/Network error" });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ✅ Search movies using backend
//   fetchSearchMovies: async (searchTerm) => {
//     if (!searchTerm || searchTerm.trim().length < 3) {
//       set({ searchResults: [], searchPerformed: false });
//       return;
//     }

//     set({ loading: true, error: null, searchPerformed: true });

//     try {
//       const res = await axios.get(`${BACKEND_URL}/search?query=${searchTerm}`);

//       set({ searchResults: res.data.movies || [] });
//     } catch (error) {
//       console.error("Search movie fetch error:", error);
//       set({ searchResults: [], error: "Backend/Network error" });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ✅ Fetch specific movie → calls getMovie controller
//   fetchMovieDetails: async (id) => {
//     if (!id) return;

//     set({ loading: true, error: null });
//     try {
//       const res = await axios.get(`${BACKEND_URL}/${id}`);
//       set({ selectedMovie: res.data });
//     } catch (error) {
//       console.error("Error fetching movie:", error);
//       set({ error: "Could not fetch movie details" });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ✅ Save movie to MongoDB
//   saveMovieToDB: async (movie) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/save`, movie);
//       return res.data;
//     } catch (error) {
//       console.error("Save movie error:", error);
//       return null;
//     }
//   },

//   // ✅ Delete movie from MongoDB
//   deleteMovieFromDB: async (id) => {
//     try {
//       await axios.delete(`${BACKEND_URL}/${id}`);
//     } catch (error) {
//       console.error("Delete movie error:", error);
//     }
//   },

//   // Handle input
//   setQuery: (query) => {
//     set({ query });
//     const { fetchSearchMovies } = get();

//     clearTimeout(get().debounceTimeout);

//     const debounceTimeout = setTimeout(() => {
//       if (query.length >= 3) {
//         fetchSearchMovies(query);
//       } else {
//         set({ searchResults: [], searchPerformed: false });
//       }
//     }, 500);

//     set({ debounceTimeout });
//   },

//   // Which movies to display
//   getDisplayMovies: () => {
//     const { searchPerformed, searchResults, movieList } = get();
//     return searchPerformed ? searchResults : movieList;
//   },

//   resetSearch: () => set({ query: "", searchPerformed: false, searchResults: [] }),
// }));

// export default useMovies;
