// import { create } from "zustand";
// import axios from "axios";

// const useApistore = create((set, get) => {
//   const fetchData = async () => {
//     const { query } = get();
//     set({ loading: true, error: null });

//     try {
//       const res = await axios.get(`https://www.omdbapi.com/?s=${query || "batman"}&apikey=7a047e7a`);
//       console.log("Response:", res.data);

//       if (res.data.Response === "False") {
//         throw new Error(res.data.Error || "Failed to fetch movies");
//       }

//       set({ data: res.data.Search || [], loading: false });
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       set({ error: err.message, loading: false });
//     }
//   };

//   return {
//     data: [],
//     error: null,
//     loading: false,
//     query: "batman",
//     setQuery: (newQuery) => set({ query: newQuery }),
//     fetchData, 
//   };
// });

// export default useApistore;
