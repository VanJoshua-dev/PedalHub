import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/landingPagebackground.png";
function VerifyCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const storedCode = localStorage.getItem('resetCode');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code === storedCode) {
      navigate('/reset-password'); // You can create this route too
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <div 
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 shadow-[0px_0px_20px_3px_#f7fafc]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Enter Verification Code</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label className="block mb-2">Code sent to your email</label>
        <input
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyCode;
