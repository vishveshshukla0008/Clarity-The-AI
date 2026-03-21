import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="h-full relative flex items-start justify-center">
      <div className="absolute inset-0 bg-cover bg-left brightness-50 "></div>

      <div className="p-4 text-xl relative z-10 max-sm:text-4xl max-md:text-6xl md:text-6xl text-center flex flex-col gap-4 font-semibold font-sans space top-1/8 sm:top-1/4">
        <p className="text-shadow-2xs text-8xl text-shadow-white text-wrap">
          Start conversations
        </p>
        <p> with advanced AI models instantly.</p>
        <p className=" text-3xl text-gray-400 font-mono">
          {" "}
          free and easy to use.
        </p>
        <Button className="relative px-8 py-3 text-xl font-bold text-white overflow-hidden group rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-sm bg-white/10 border border-white/20">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 group-hover:from-white/30 group-hover:via-white/20 group-hover:to-white/30 transition-all duration-300"></div>

          {/* Animated Border Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse rounded-lg"></div>

          {/* Content */}
          <Link
            to="/dashboard"
            className="relative z-10 flex items-center justify-center gap-2 group">
            Explore
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
