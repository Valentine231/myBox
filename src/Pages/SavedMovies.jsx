import React, { useEffect, useState } from 'react'
import { supabase } from '../service/Supabase'
import useAuth from '../Store/Authstore'
import { useNavigate } from 'react-router-dom'
import { Bookmark, Trash2, Play } from 'lucide-react'

const SavedMovies = () => {
    const [savedMovies, setSavedMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth() // Get user from your Zustand store
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetchSavedMovies()
        } else {
            setLoading(false)
        }
    }, [user])

    const fetchSavedMovies = async () => {
        try {
            const { data, error } = await supabase
                .from('saved_movies')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setSavedMovies(data || [])
        } catch (error) {
            console.error('Error fetching saved movies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteMovie = async (movieId) => {
        try {
            const { error } = await supabase
                .from('saved_movies')
                .delete()
                .eq('id', movieId)

            if (error) throw error

            setSavedMovies(savedMovies.filter(movie => movie.id !== movieId))
        } catch (error) {
            console.error('Error deleting movie:', error)
            alert('Error removing movie. Please try again.')
        }
    }

    const handleViewMovie = (imdbId) => {
        navigate(`/movie/${imdbId}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-white">Loading your collection...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-white text-xl mb-4">Please sign in to view your saved movies</p>
                    <button 
                        onClick={() => navigate('/auth')}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-200"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Movie Collection</h1>
                
                {savedMovies.length === 0 ? (
                    <div className="text-center py-12">
                        <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-xl">No movies saved yet</p>
                        <p className="text-gray-500">Start saving movies to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {savedMovies.map((movie) => (
                            <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition duration-200">
                                <img
                                    src={movie.poster !== "N/A" ? movie.poster : "/placeholder.png"}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{movie.year}</p>
                                    <p className="text-yellow-400 text-sm mb-3">⭐ {movie.imdb_rating}</p>
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => handleViewMovie(movie.imdb_id)}
                                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition duration-200"
                                        >
                                            <Play className="w-4 h-4" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMovie(movie.id)}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition duration-200"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedMovies