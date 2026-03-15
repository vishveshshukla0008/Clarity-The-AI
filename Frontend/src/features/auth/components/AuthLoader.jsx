import React from "react";
import { User } from "lucide-react";

const AuthLoader = ({ content }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10 bg-black text-white">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-24 w-24 rounded-full bg-green-500/20 blur-xl animate-pulse"></span>
        <span className="absolute h-20 w-20 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></span>
        <User size={50} className="text-green-500 animate-pulse" />
      </div>
      <p className="text-xl text-white tracking-wide">
        {content || "Clarity AI is checking your session !"}
      </p>
    </div>
  );
};

export default AuthLoader;
