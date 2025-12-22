import React, { useEffect, useState } from 'react'
import useBackendAuthStore from '../Store/BackendAuthstore'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bookmark, Trash2, Play } from 'lucide-react'

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const { user } = useBackendAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) fetchSavedMovies()
    else setLoading(false)
  
  }, [user])

  const fetchSavedMovies = async () => {
   try {
    const res = await axios.get(
      `http://localhost:5000/api/movies/saved/${user._id}`
    );

    const normalized = res.data.map(movie => ({
      ...movie,
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
    }));

    setSavedMovies(normalized);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  }

  const handleDeleteMovie = async (movieId) => {
    setDeleting(movieId)
    try {
      await axios.delete(`http://localhost:5000/api/movies/${movieId}`)
      setSavedMovies(savedMovies.filter(movie => movie._id !== movieId))
    } catch (error) {
      console.error("Error deleting movie:", error)
    } finally {
      setDeleting(null)
    }
  }

  const handleViewMovie = (imdbID) => {
    navigate(`/movie/${imdbID}`)
  }

  if (loading) return <div className="text-white text-center p-10">Loading...</div>

  if (!user) return (
    <div className="text-center text-white p-10">
      <p>Please sign in to view saved movies.</p>
      <button onClick={() => navigate('/auth')} className="mt-4 px-6 py-2 bg-blue-600 rounded-lg">Sign In</button>
    </div>
  )

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Saved Movies</h1>

      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {savedMovies.map(movie => (
            <div key={movie._id} className="bg-gray-800 rounded-xl p-3">
              <img src={movie.poster || movie.Poster} className="w-full h-60 object-cover rounded" />

              <h3 className="mt-2 font-semibold truncate">{movie.title || movie.Title}</h3>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleViewMovie(movie.imdbID)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  <Play className="w-4 h-4 inline" /> View
                </button>

                <button
                  disabled={deleting === movie._id}
                  onClick={() => handleDeleteMovie(movie._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  <Trash2 className="w-4 h-4 inline" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedMovies
