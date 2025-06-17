import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import bg from "../assets/landingPagebackground.png";
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users[0].users.find(user => user.Email === email);

    if (foundUser) {
      // Simulate sending a code by saving in localStorage
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('resetEmail', email);
      localStorage.setItem('resetCode', code);
      alert(`Simulated email sent. Your code is: ${code}`); // simulate "sent"
      navigate('/verify-code');
    } else {
      setError('Email not found');
    }
  };

  return (
    <div 
    style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
    className="w-screen h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 shadow-[0px_0px_20px_3px_#f7fafc]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label className="block mb-2">Enter your email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
