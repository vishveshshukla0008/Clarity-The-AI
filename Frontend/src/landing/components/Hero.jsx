import React from "react";

const Hero = () => {
  return (
    <div className="h-full relative flex items-start justify-center">
      <div className="absolute inset-0 bg-[url('/images/scene.jpg')] bg-cover bg-left brightness-50 "></div>

      <div className="p-4 text-xl relative z-10 max-sm:text-4xl max-md:text-6xl md:text-6xl text-center flex flex-col gap-4 font-semibold font-sans space top-1/8 sm:top-1/4">
        <p className="text-shadow-2xs text-shadow-white text-wrap">Start conversations</p>
        <p> with advanced AI models instantly.</p>
        <p className=" text-3xl text-gray-400 font-mono"> free and easy to use.</p>
      </div>
    </div>
  );
};

export default Hero;
