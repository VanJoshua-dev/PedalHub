import React from "react";
import bg from "../assets/landingPagebackground.png";
function InvalidAccess() {
    const back = (() => {
        window.history.back();
    })
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl text-white text-center">
        UNAUTHORIZED ACCESS ☹️
      </h1>
      <button onClick={back} className="px-2 py-4 bg-gray-300">Go back</button>
    </div>
  );
}

export default InvalidAccess;
