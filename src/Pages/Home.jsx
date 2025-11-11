import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../Components/Logo'
import { User } from 'lucide-react'
import Footer from '../Components/Footer'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/Auth')
  }

  return (
    <div className="min-h-screen bg-[url('/images/movieimages.jpeg')] bg-cover bg-center bg-fixed bg-no-repeat">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-4 md:px-10 bg-black/40">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-blue-700 font-bold text-xl md:text-2xl">MyBox</span>
        </div>

        {/* Right Section: Sign in */}
        <div className="flex items-center gap-2">
          <Link 
            to="/auth"
            className="text-blue-700 font-semibold text-base md:text-lg hover:underline"
          >
            Sign In / Login
          </Link>
          <User className="w-5 h-5 md:w-6 md:h-6 text-blue-950" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="min-h-[calc(100vh-80px)] bg-black/60 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
          Welcome to MyBoxOffice
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl text-gray-200">
          Discover, explore, and save your favorite movies in one place.
          Your personal cinema experience starts here.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={handleNavigate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
          >
            Explore
          </button>

          <button 
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
          >
            Learn More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
