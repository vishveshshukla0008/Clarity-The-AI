import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { LoaderPinwheel, User, LogOut, Menu, X, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AI Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-200 w-full bg-[#11111a]  border-white/10 bg-">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 text-xl md:text-2xl font-extrabold text-white">
          <LoaderPinwheel className="size-6 md:size-8" />
          Clarity AI
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive, isPending }) =>
                `transition-all duration-200 ${
                  isPending
                    ? "text-red-500"
                    : isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                }`
              }>
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-full p-2 hover:bg-white/10 transition">
                  <User className="h-8 w-8 text-white/70 bg-gray-700 rounded-full p-1" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48  bg-[#11111a] border border-white/10 text-white">
                <DropdownMenuItem className="p-2 ">
                  <User className="mr-2 h-4 w-4" />
                  {user?.fullname}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                  className="cursor-pointer  text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span> Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="px-5 bg-transparent hover:text-white text-gray-200">
              <NavLink
                to={"/login"}
                className={({ isActive, isPending }) =>
                  `transition-all duration-200 ${
                    isPending
                      ? "text-red-500"
                      : isActive
                        ? "text-white font-semibold"
                        : "text-gray-400 hover:text-white"
                  }`
                }>
                Sign in
              </NavLink>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden w-full absolute z-50 border-t border-white/10 bg-[#0d0d15] 
  transform transition-transform duration-100 ease-in-out
  ${open ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}`}>
          <ul className="flex flex-col items-start gap-4 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }>
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
