import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import bg from "../assets/landingPagebackground.png";

// Import JSON user data
import userData from "../data/users.json";

function Loginform() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = userData[0]?.users || [];
    const user = users.find((u) => u.User === username && u.Pass === password);

    if (user) {
      // Save user to localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("user", username);
      localStorage.setItem("role", user.isAdmin ? "admin" : "user");
      // Redirect based on role
      if (user.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/shop");
      }
    } else {
      setError(true);
    }
  };
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedRole = localStorage.getItem("role");

//     if (storedUser && storedRole) {
//       if (storedRole === "admin") {
//         navigate("/dashboard");
//       } else if (storedRole === "user") {
//         navigate("/shop");
//       }
//     }
//   }, [navigate]);
  return (
    <div
      className="w-screen h-screen p-20 flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="w-120 h-140 rounded-sm p-5 bg-white shadow-[0px_0px_20px_3px_#f7fafc]"
      >
        <h1 className="w-full text-3xl mt-6 mb-4 text-center font-semibold">
          Login to PedalHub
        </h1>

        <p
          className={clsx(
            "text-center text-red-500 transition-opacity duration-300",
            error ? "opacity-100" : "opacity-0"
          )}
        >
          Incorrect username or password
        </p>

        <div className="w-full p-3 px-6">
          <label htmlFor="username">Username</label>
          <input
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full p-3 px-6">
          <label htmlFor="password">Password</label>
          <input
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholder="Enter your password"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-between py-3 px-8">
          <div className="flex items-center gap-1">
            <input
              className="w-5 h-5"
              onChange={(e) => setShowPass(e.target.checked)}
              type="checkbox"
            />
            <label>Show password</label>
          </div>
          <p 
          onClick={() => navigate("/forgot-password")}
          className="p-1 hover:underline hover:text-blue-500 cursor-pointer">
            Forgot password?
          </p>
        </div>

        <div className="w-full flex p-5 justify-center">
          <button
            className="py-3 px-9 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="p-5 text-center">
          Don't have an account?{" "}
          <a className="text-blue-500 hover:underline" href="/signup">
            Signup here.
          </a>
        </div>
      </form>
    </div>
  );
}

export default Loginform;
