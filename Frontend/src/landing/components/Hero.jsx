import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="min-h-screen relative flex items-start justify-center overflow-scroll no-scrollbar">
      
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-left brightness-50"></div>

      {/* Content */}
      <div className="relative z-10 
        px-4 sm:px-6 md:px-8 
        pt-24 sm:pt-32 md:pt-40
        text-center flex flex-col gap-4 
        font-semibold font-sans">

        {/* Heading */}
        <p className="
          text-3xl 
          sm:text-4xl 
          md:text-6xl 
          lg:text-7xl 
          xl:text-8xl 
          text-white leading-tight">
          Start conversations
        </p>

        <p className="
          text-base 
          sm:text-lg 
          md:text-xl 
          lg:text-4xl 
          text-white">
          with advanced AI models instantly.
        </p>

        <p className="
          text-sm 
          sm:text-base 
          md:text-lg 
          text-gray-300 font-mono">
          free and easy to use.
        </p>

        {/* Button */}
        <div className="mt-4 flex justify-center">
          <Button
            className="
            relative 
            px-5 py-2.5 
            sm:px-6 sm:py-3 
            md:px-8 md:py-3.5
            text-sm 
            sm:text-base 
            md:text-lg 
            font-bold text-white 
            overflow-hidden group rounded-lg 
            transition-all duration-300 
            hover:scale-105 active:scale-95 
            shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] 
            backdrop-blur-sm bg-white/10 
            border border-white/20">

            {/* Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-r 
              from-white/20 via-white/10 to-white/20 
              group-hover:from-white/30 
              group-hover:via-white/20 
              group-hover:to-white/30 
              transition-all duration-300">
            </div>

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 
              bg-gradient-to-r from-transparent via-white/50 to-transparent 
              animate-pulse rounded-lg">
            </div>

            {/* Content */}
            <Link
              to="/dashboard"
              className="relative z-10 flex items-center gap-2">

              Explore

              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  );
};

export default Hero;