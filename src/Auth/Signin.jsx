import { useState } from 'react'
import useAuth from '../Store/Authstore'
import Spinner from '../Components/Authloader'


const Signin = () => {
  const {signup,loading,notification}=useAuth()
  const [email,setEmail] = useState("")
  const [password, setpassword] = useState("")

  const handleSignup =(e)=>{
    e.preventDefault()
    signup(email,password)
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      
          <div className='bg-white items-center rounded-lg w-full p-8 max-w-md'>
            <h2 className='text-gray-600 font-bold text-center justify-center text-3xl '>Welcome</h2>
            <form onSubmit={handleSignup} className=' space-y-5'>
                <input type="Email" 
                placeholder='Email'
                className='py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

               <input type="password" 
                placeholder='password'
                className='py-3 px-5 w-full border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none'
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />


          <button type='submit' 
          className='py-2 w-full bg-indigo-600 rounded-lg text-white font-semibold transition duration-300'
          disabled={loading}
          >
            {loading ? <Spinner size='small' color='green' /> : "Signup"}
          
          </button>
            </form>

            {notification && (
              <p className='mt-4 text-sm text-indigo-800 '>{notification}</p>
            )}
          </div>
    </div>
  )
}

export default Signin