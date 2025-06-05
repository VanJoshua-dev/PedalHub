import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import bg from '../assets/landingPagebackground.png'
import clsx from 'clsx';
function SignupPage() {
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);

    const [error, setError] = useState(false)
  return (
    <div
        className='w-screen h-screen p-20 flex justify-center items-center'
        style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
    >
        <form
        className='w-120 h-140 rounded-sm p-5 bg-white shadow-[0px_0px_20px_3px_#f7fafc]'
        action="">
            <h1 className='w-full text-3xl mt-6 mb-10 text-center font-semibold'>Create your account</h1>
            {/* Email */}
            <div className='w-full px-6'>
                <label htmlFor="email">Email</label>
                <input 
                className='w-full p-2 border-2 border-gray-500 rounded-md'
                placeholder='Enter your email'
                type="email" />
                <p className={clsx('text-red-500', error ? "opacity-100" : "opacity-0")}>Email already exist.</p>
            </div>
            {/* Username */}
            <div className='w-full px-6'>
                <label htmlFor="username">Username</label>
                <input 
                className='w-full p-2 border-2 border-gray-500 rounded-md'
                placeholder='Enter your username'
                type="text" />
                <p className={clsx('text-red-500', error ? "opacity-100" : "opacity-0")}>Username already exist.</p>
            </div>
            <div className='w-full px-6'>
                <label htmlFor="password">Password</label>
                <input 
                className='w-full p-2 border-2 border-gray-500 rounded-md'
                placeholder='Enter your password'
                type={showPass ? "text" : "password"} />
                <p className={clsx('text-red-500', error ? "opacity-100" : "opacity-0")}>Incorrect password.</p>
            </div>

            <div className='flex flex-row justify-between px-8'> 
                {/* Checkbox for show password */}
                <div className='flex items-center gap-1'>
                    <input 
                    className='w-5 h-5 '
                    onChange={(e) => setShowPass(e.target.checked)}
                    type="checkbox" />
                    <label htmlFor="">Show password</label>
                </div>
            </div>

            <div className='w-full p-5 flex justify-center'>
                <button 
                className='py-3 px-9 rounded-md bg-blue-500 hover:bg-blue-600'
                type="submit">Signup</button>
            </div>

            <div className='p-3'>
                <p
                className='text-center'
                >Already have an account? <a className='text-blue-500 hover:underline' href="/login">Login here.</a></p>
            </div>
        </form>
    </div>
  )
}

export default SignupPage
