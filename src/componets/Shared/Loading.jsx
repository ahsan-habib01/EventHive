import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-base-200 rounded-full"></div>

        {/* Spinning Accent Ring */}
        <div className="absolute w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        {/* Inner Pulse */}
        <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>

        {/* Logo / Icon Center */}
        <div className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary-content"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default Loading;
