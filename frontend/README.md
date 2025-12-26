🎬 MyBox – Full-Stack Movie Application

MyBox is a full-stack movie application that allows users to search movies, view details, save favorites, and manage saved movies with authentication.
The app is built with React + Zustand on the frontend and Node.js, Express, MongoDB on the backend, with deployments handled via Render.

🚀 Live Demo

Backend (Render):
https://mybox-1uup.onrender.com

Frontend:
(Add your deployed frontend URL when ready)

🧩 Features
✅ Authentication

User signup & login

Persistent login using Zustand + localStorage

Backend authentication via JWT

🎥 Movies

Search movies using OMDb API

View detailed movie information

Default movie feed (e.g. Superman)

⭐ Saved Movies

Save movies to MongoDB

Fetch saved movies per user

Delete saved movies

Data normalization for consistent UI rendering

🌐 Deployment

Backend deployed on Render

Environment-based API configuration

CORS-enabled API for frontend access

🛠️ Tech Stack
Frontend

React (Vite)

Zustand (state management)

Axios (HTTP requests)

React Router

Tailwind CSS

Lucide Icons

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

OMDb API

Deployment

Render (Backend)

GitHub (Version control)

📁 Project Structure
myBox/
│
├── frontend/
│   ├── src/
│   │   ├── Store/
│   │   │   ├── BackendAuthstore.js
│   │   │   └── fetch.js
│   │   ├── Pages/
│   │   │   ├── SavedMovies.jsx
│   │   │   └── MovieDetails.jsx
│   │   └── main.jsx
│   └── .env
│
├── backend/
│   ├── Controllers/
│   ├── Routes/
│   ├── Models/
│   ├── config/
│   └── Server.js
│
└── README.md

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/signup	Create account
POST	/api/auth/login	Login
Movies
Method	Endpoint	Description
GET	/api/movies/search?query=	Search movies
POST	/api/movies/save	Save movie
GET	/api/movies/saved/:userId	Get saved movies
DELETE	/api/movies/:movieId	Delete saved movie
🧠 Key Learnings

Managing global state with Zustand

Connecting frontend ↔ backend using environment variables

Handling Render deployment issues

Normalizing backend data for frontend UI

Secure authentication with JWT

📌 Future Improvements

🔐 Protected routes (auth middleware)

❤️ Like / favorite system

🎭 Movie categories & filters

🧪 Unit & integration testing

📱 Mobile UI optimizations

⚠️ Known Issues / Pending Fixes

The following issues are currently under investigation and will be resolved in upcoming updates:

🐞 Saved Movies Rendering Issue

On the Saved Movies page:

❌ Movie poster images may fail to render

❌ Movie title may not display correctly

❌ Movie year may be missing

Cause:

Inconsistent field naming between:

OMDb API response (Title, Year, Poster)

MongoDB stored fields (title, year, poster)

Current Status:

Partial normalization implemented on the frontend

Backend schema & response format still being aligned

✔️ Planned Fix

Enforce consistent field names in MongoDB schema

Normalize movie data at save-time on the backend

Add fallback rendering on the frontend

👨‍💻 Author

Valentine Ugwu
Frontend Developer | Full-Stack Enthusiast
GitHub: https://github.com/Valentine231










