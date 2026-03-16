import React from "react";
import { User } from "lucide-react";

const AuthLoader = ({ content }) => {
  return (
    <div className="min-h-screen fixed inset-0 z-10 w-full flex flex-col items-center justify-center gap-10 bg-[#11111a] backdrop-blur-xs text-white">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-24 w-24 rounded-full bg-white/40 blur-xl animate-pulse"></span>

        <span className="absolute h-20 w-20 rounded-full border-2 border-white border-t-transparent animate-spin"></span>

        <User size={50} className="text-white animate-pulse relative z-10" />
      </div>

      <p className="text-xl tracking-wide text-white">
        {content || "Clarity AI is checking your session !"}
      </p>
    </div>
  );
};

export default AuthLoader;
