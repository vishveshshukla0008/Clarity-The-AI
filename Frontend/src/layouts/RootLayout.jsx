import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-350  h-fit">
        <Toaster position="top-right" />
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
