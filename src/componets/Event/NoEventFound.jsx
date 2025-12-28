import React from "react";
import Lottie from "react-lottie-player";
import noEventAnimation from "../../assets/animation.json";

const NoEventFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Lottie
        loop
        animationData={noEventAnimation}
        play
        style={{ height: "300px", width: "300px" }}
      />
      <h2 className="text-xl text-gray-500 mt-4 font-semibold">
        No events found! 😢
      </h2>
      <p className="text-gray-400">Try searching for something else.</p>
    </div>
  );
};

export default NoEventFound;
