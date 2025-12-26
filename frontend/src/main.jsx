import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import Home from "./Pages/Home.jsx";
import Movielayout from "./Pages/Movielayout.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import Toggle from "./Auth/Toggle.jsx";
import SavedMovies from "./Pages/SavedMovies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // ✅ ROOT LAYOUT (IMPORTANT)
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movieslayout",
        element: <Movielayout />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "auth",
        element: <Toggle />,
      },
      {
        path: "savedmovies",
        element: <SavedMovies />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
