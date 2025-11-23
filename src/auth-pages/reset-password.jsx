// pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/landingPagebackground.png";
function ResetPassword() {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPass.length < 6) {
      return setError("Password too short");
    }
    if (newPass !== confirmPass) {
      return setError("Passwords do not match");
    }

    const email = localStorage.getItem("resetEmail");
    try {
      const res = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: newPass }),
      });

      if (res.ok) {
        navigate("/login");
      } else {
        const msg = await res.text();
        setError(msg || "Failed to reset");
      }
    } catch (err) {
      setError("Error contacting server");
    }
  };

  return (
    <div 
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded w-96 shadow-[0px_0px_20px_3px_#f7fafc]">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          className="w-full border p-2 mb-2"
          placeholder="New password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 mb-2"
          placeholder="Confirm password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
