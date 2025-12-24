🎬 MyBoxOffice — Movie App (React + Zustand + Supabase + OMDB API)

MyBoxOffice is a movie discovery web application built with React, Zustand, TailwindCSS, Supabase, and the OMDB API.
It allows users to search movies, view detailed information, save movies to their collection, and manage authentication (signup, login, logout).

 Features
 Authentication (Supabase + Zustand)

User signup with email & password

Login with "Remember Me" option

Logout

Local user persistence using localStorage

Notifications (success / error messages)

🎥 Movie System (OMDB API + Zustand)

Fetch default movie list (e.g., Batman) on first load

Search movies with built-in debounce

View full movie details

Handles loading, errors, and empty search states

Save movies to Supabase

Delete saved movies

Check if a movie was already saved

UI

Clean responsive layout

Movie cards, search interface, navbar, footer

Movie details page with dynamic UI states (saved, ratings, plot, etc.)

🛠 Tech Stack
Tool	Purpose
React	UI framework
Zustand	State management
Supabase	Authentication + Database
OMDB API	Movie data
TailwindCSS	Styling
Axios	API calls
Lucide-react	Icons


 Project Structure
src/
 ├── Store/
 │    ├── Authstore.js     # Supabase auth with Zustand
 │    └── Apistore.js      # Movie API logic with Zustand
 ├── Components/
 │    ├── Card.jsx
 │    ├── Loader.jsx
 │    ├── Footer.jsx
 │    ├── Nav.jsx
 │    ├── Logo.jsx
 │    └── Authloader.jsx
 ├── Pages/
 │    ├── Home.jsx
 │    ├── Movielayout.jsx
 │    └── MovieDetails.jsx
 └── service/
      └── Supabase.js

🔐 Authentication Store (Summary)

Handles:

signup(email, password)

login(email, password, rememberMe)

logout()

loadUser() for remembering sessions

Saves remembered user to localStorage

🎥 Movie Store (Summary)

Handles:

Fetching default movies

Search movies with debounce (length ≥ 3)

Load full movie details

Tracks:

movieList

searchResults

query

loading, error

selectedMovie

Logic to decide whether to show search results or default movies

🖥 Main Pages
Home Page

Hero section

Link to signup/login

Background image & responsive layout

Movie Layout Page

Loads default movies on mount

Shows search results or default movies

Handles empty search, errors, loaders

Movie Details Page

Full movie info (poster, genre, cast, plot, ratings)

Save movie to Supabase

Delete saved movie

UI reacts to saved state

Back navigation