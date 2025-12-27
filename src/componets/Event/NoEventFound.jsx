import React from "react";

import noFoodAnimation from "../../assets/animation.json"; 
import { Player } from "@lottiefiles/react-lottie-player";

const NoEventFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Player
        autoplay
        loop
        src={noFoodAnimation}
        style={{ height: "300px", width: "300px" }}
      />
      <h2 className="text-xl text-gray-500 mt-4 font-semibold">
        No foods found! 😢
      </h2>
      <p className="text-gray-400">Try searching for something else.</p>
    </div>
  );
};

export default NoEventFound;
