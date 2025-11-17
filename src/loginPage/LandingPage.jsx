import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/landingPagebackground.png";
import logo from "../assets/Logo.png";
import { FaShoppingCart } from "react-icons/fa";
function LandingPage() {
  const navigate = useNavigate();

  const headerButton = [
    { label: "Login", icon: "", link: "/login" },
    { label: "Sign up", icon: "", link: "/signup" },
  ];

  const text = [
    "We offer quality bikes, parts, and accessories, from gears and rims to tires and more.",
    "Whether you're upgrading or just getting started, we've got everything you need to ride with confidence.",
  ];
  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="w-full p-5 flex flex-row gap-2 justify-end">
        {headerButton.map((buttons, index) => (
          <button
            key={index}
            onClick={() => navigate(buttons.link)}
            className="text-white text-xl p-2 w-25 border-transparent border-b-2 hover:border-white transtion-all duration-300 hover:text-blue-300 cursor-pointer"
          >
            {buttons.label}
          </button>
        ))}
      </header>
      <main className="welcomeTxt w-full h-full p-5 font-bold text-6xl flex flex-col justify-center  items-center">
        <div className="flex items-center">
          <h1 className="text-white mb-10">Welcome to</h1>
          <img src={logo} alt="" className="w-100 mb-10" />
        </div>

        {text.map((texts, index) => (
          <p key={index} className="text-[20px] mb-1 text-white">
            {texts}
          </p>
        ))}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="group cursor-pointer flex items-center justify-center bg-blue-500 text-white text-2xl rounded-md mt-5 px-5 py-2 overflow-hidden transition-all duration-300 hover:bg-blue-600"
        >
          <span className="transition-all duration-300">Shop now</span>

          <div className="w-0 overflow-hidden transition-all duration-300 group-hover:w-8 flex justify-center">
            <FaShoppingCart className="opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
