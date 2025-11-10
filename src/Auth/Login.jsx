import React, { useState } from 'react'
import useAuth from '../Store/Authstore'
import Spinner from '../Components/Authloader'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const { login, loading, notification, rememberMe } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password, remember)
    navigate('/movieslayout')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      <div className='bg-white rounded-lg w-full p-8 max-w-md'>
        <h2 className='text-gray-600 font-bold text-center text-3xl mb-6'>Login</h2>
        
        <form onSubmit={handleLogin} className='space-y-5'>
          {/* Email Input */}
          <div>
            <input 
              type="email" 
              placeholder='Email'
              className='py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              className='py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-12'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input 
                type="checkbox" 
                className="accent-indigo-500" 
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type='submit' 
            className='py-3 w-full bg-indigo-600 rounded-lg text-white font-semibold transition duration-300 hover:bg-indigo-700 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? <Spinner size='small' color='green' /> : "Login"}
          </button>
        </form>

        {notification && (
          <p className='mt-4 text-sm text-center text-indigo-500'>{notification}</p>
        )}
      </div>
    </div>
  )
}

export default Login