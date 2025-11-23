import React from "react";

function Spinner() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 
                    backdrop-blur-sm bg-black/20"
    >
      <div className="flex flex-col items-center">
        {/* Simple spinning circle */}
        <div
          className="w-12 h-12 border-4 border-white border-t-transparent 
                        rounded-full animate-spin"
        ></div>

        <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default Spinner;
