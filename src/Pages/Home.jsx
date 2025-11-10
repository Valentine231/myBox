import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../Components/Logo'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = ()=>{
    navigate('/Auth')
  }
  return (
    <div className="min-h-screen bg-[url('/images/movieimages.jpeg')] bg-cover bg-center bg-fixed bg-no-repeat">
      {/* Overlay with content */}
      <div className='flex items-center '>
      <Logo /> 
      <span className='text-blue-700 font-bold text-2xl'>MyBox</span>
      </div>
     
      <div className="min-h-screen bg-black/60 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-5xl font-bold mb-6">Welcome to Cineverse</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover, explore, and save your favorite movies in one place. 
            Your personal cinema experience starts here.
          </p>
          <div className="space-x-4">
            <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
            onClick={handleNavigate}
            >
              Explore
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home