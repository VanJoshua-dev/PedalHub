import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/landingPagebackground.png";

function Loginform() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  };
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
        <h1 className="w-full text-3xl mt-6 mb-8 text-center font-semibold">
          Login to PedalHub
        </h1>

        <div className="w-full p-3 px-6">
          <label htmlFor="email-address">
            Email address <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full p-3 px-6">
          <label htmlFor="password">
            Password <sup className="text-red-500 text-sm">*</sup>
          </label>
          <input
            className="w-full p-2 border-2 border-gray-500 rounded-md"
            placeholder="Enter your password"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-row justify-between py-1 px-8">
          <div className="flex items-center gap-1">
            <input
              className="w-5 h-5 cursor-pointer"
              onChange={(e) => setShowPass(e.target.checked)}
              type="checkbox"
            />
            <label>Show password</label>
          </div>
          <p
            onClick={() => navigate("/forgot-password")}
            className="p-1 hover:underline hover:text-blue-500 cursor-pointer transition-all duration-300"
          >
            Forgot password?
          </p>
        </div>

        <div className="w-full flex p-5 justify-center">
          <button
            disabled={isLoading}
            className="py-3 px-9 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                <span>Checking...</span>
              </div>
            ) : (
              "Login"
            )}
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
