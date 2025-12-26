import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({movie}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/movie/${movie.imdbID}`) // Pass the movie ID in the URL
  }
  
  return (
    <div onClick={handleNavigate} className='max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer'>
        <img className='w-full h-64 object-cover' src={movie.Poster} alt={movie.Title} />
        <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{movie.Title}</div>
            <p className='text-gray-700'>{movie.Year}</p>
        </div>
    </div>
  )
}

export default Card