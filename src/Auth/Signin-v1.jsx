import { useState } from 'react'
import useAuth from '../Store/Authstore'
import Spinner from '../Components/Authloader'
import Login from './Login'
import { Eye, EyeOff } from 'lucide-react';

const Signin = () => {
  const { signup, loading, notification } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignup = (e) => {
    e.preventDefault()
    signup(email, password)
  }

  return (
    <div className=" ">
      <div className=" rounded-lg w-full p-8 max-w-md shadow-lg">

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 gap-4">
          {/* <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-6 rounded-lg font-semibold ${
              !isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Sign Up
          </button> */}

          {/* <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-6 rounded-lg font-semibold ${
              isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Login
          </button> */}
        </div>

        {/* Render Form Based on State */}
        {!isLogin ? (
          <>
            <h2 className="text-gray-600 font-bold text-center text-3xl mb-4">
              Create Account
            </h2>
            <form onSubmit={handleSignup} className="space-y-5"> 
              <div>
              <input
                type="email"
                placeholder="Email"
                className="py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              </div>
             
             <div className='relative'>
             <input
                type={showPassword ? "text" : password}
                placeholder="Password"
                className="py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               
               
               <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
             </div>

              
              <button
                type="submit"
                className="py-3 w-full bg-indigo-600 rounded-lg text-white font-semibold transition duration-300 hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? <Spinner  /> : 'Sign Up'}
              </button>
            </form>

            {notification && (
              <p className="mt-4 text-sm text-indigo-800 text-center">
                {notification}
              </p>
            )}
          </>
        ) : (
          <Login nested />
        )}
      </div>
    </div>
  )
}

export default Signin
